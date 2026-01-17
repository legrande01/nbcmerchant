import { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Download, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { AdminVehicle, tanzaniaRegions } from '@/data/transportAdminData';

interface ParsedVehicle {
  plateNumber: string;
  type: 'bike' | 'car' | 'van' | 'truck';
  loadCapacity: string;
  operatingZone: string;
  status: 'active' | 'inactive';
  isValid: boolean;
  errors: string[];
}

interface BulkVehicleImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVehiclesImported: (vehicles: AdminVehicle[]) => void;
  existingPlateNumbers: string[];
}

const VALID_TYPES = ['bike', 'car', 'van', 'truck'];
const VALID_STATUSES = ['active', 'inactive'];

export function BulkVehicleImportModal({
  open,
  onOpenChange,
  onVehiclesImported,
  existingPlateNumbers,
}: BulkVehicleImportModalProps) {
  const [parsedVehicles, setParsedVehicles] = useState<ParsedVehicle[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [parseError, setParseError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validVehicles = parsedVehicles.filter((v) => v.isValid);
  const invalidVehicles = parsedVehicles.filter((v) => !v.isValid);

  const validateVehicle = (row: string[], rowIndex: number): ParsedVehicle => {
    const errors: string[] = [];
    const [plateNumber, type, loadCapacity, operatingZone, status] = row.map((cell) =>
      cell?.trim() || ''
    );

    // Validate plate number
    if (!plateNumber) {
      errors.push('Plate number is required');
    } else if (existingPlateNumbers.includes(plateNumber.toUpperCase())) {
      errors.push('Plate number already exists');
    }

    // Validate type
    const normalizedType = type.toLowerCase();
    if (!VALID_TYPES.includes(normalizedType)) {
      errors.push(`Invalid type: ${type}. Must be bike, car, van, or truck`);
    }

    // Validate load capacity
    if (!loadCapacity) {
      errors.push('Load capacity is required');
    } else if (isNaN(Number(loadCapacity.replace(/[^0-9]/g, '')))) {
      errors.push('Load capacity must be a number');
    }

    // Validate operating zone
    if (!operatingZone) {
      errors.push('Operating zone is required');
    }

    // Validate status
    const normalizedStatus = status?.toLowerCase() || 'active';
    if (status && !VALID_STATUSES.includes(normalizedStatus)) {
      errors.push(`Invalid status: ${status}. Must be active or inactive`);
    }

    return {
      plateNumber: plateNumber.toUpperCase(),
      type: normalizedType as 'bike' | 'car' | 'van' | 'truck',
      loadCapacity: loadCapacity.includes('kg') ? loadCapacity : `${loadCapacity} kg`,
      operatingZone,
      status: (normalizedStatus || 'active') as 'active' | 'inactive',
      isValid: errors.length === 0,
      errors,
    };
  };

  const parseCSV = (content: string): ParsedVehicle[] => {
    const lines = content.split('\n').filter((line) => line.trim());
    
    // Skip header row if present
    const hasHeader = lines[0]?.toLowerCase().includes('plate');
    const dataLines = hasHeader ? lines.slice(1) : lines;

    return dataLines.map((line, index) => {
      const cells = line.split(',').map((cell) => cell.trim().replace(/^["']|["']$/g, ''));
      return validateVehicle(cells, index + 1);
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setParseError('Please upload a CSV file');
      return;
    }

    setFileName(file.name);
    setParseError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = parseCSV(content);
        
        if (parsed.length === 0) {
          setParseError('No valid data found in CSV file');
          setParsedVehicles([]);
          return;
        }

        setParsedVehicles(parsed);
      } catch (error) {
        setParseError('Failed to parse CSV file. Please check the format.');
        setParsedVehicles([]);
      }
    };
    reader.onerror = () => {
      setParseError('Failed to read file');
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    const newVehicles: AdminVehicle[] = validVehicles.map((v, index) => ({
      id: `VEH-IMPORT-${Date.now()}-${index}`,
      plateNumber: v.plateNumber,
      type: v.type,
      loadCapacity: v.loadCapacity,
      status: v.status,
      assignedDriver: null,
      assignedDriverId: null,
      operatingZone: v.operatingZone,
      activeDeliveries: 0,
      activityHistory: [
        {
          id: `ACT-${Date.now()}-${index}`,
          action: 'created',
          timestamp: new Date().toISOString(),
          details: 'Vehicle registered via bulk import',
        },
      ],
      recentDeliveries: [],
      currentDelivery: null,
    }));

    onVehiclesImported(newVehicles);
    toast.success(`Successfully imported ${newVehicles.length} vehicles`);
    handleClose();
  };

  const handleClose = () => {
    setParsedVehicles([]);
    setFileName('');
    setParseError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onOpenChange(false);
  };

  const downloadTemplate = () => {
    const template = `Plate Number,Type,Load Capacity (kg),Operating Zone,Status
T 100 AAA,bike,20,Dar es Salaam - Ilala,active
T 200 BBB,car,100,Dar es Salaam - Kinondoni,active
T 300 CCC,van,500,Mwanza - Nyamagana,inactive
T 400 DDD,truck,2000,Arusha - Arusha City,active`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vehicle_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk Vehicle Import
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Template Download */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Download CSV Template</p>
                <p className="text-sm text-muted-foreground">
                  Use this template to ensure correct format
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="font-medium">
                {fileName ? fileName : 'Click to upload CSV file'}
              </p>
              <p className="text-sm text-muted-foreground">
                Supported format: CSV with columns for Plate Number, Type, Load Capacity, Operating Zone, Status
              </p>
            </label>
          </div>

          {/* Parse Error */}
          {parseError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{parseError}</AlertDescription>
            </Alert>
          )}

          {/* Results Summary */}
          {parsedVehicles.length > 0 && (
            <>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">
                    {validVehicles.length} valid vehicles
                  </span>
                </div>
                {invalidVehicles.length > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">
                      {invalidVehicles.length} with errors
                    </span>
                  </div>
                )}
              </div>

              {/* Preview Table */}
              <ScrollArea className="h-[300px] border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Status</TableHead>
                      <TableHead>Plate Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Zone</TableHead>
                      <TableHead>Issues</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedVehicles.map((vehicle, index) => (
                      <TableRow
                        key={index}
                        className={vehicle.isValid ? '' : 'bg-red-50'}
                      >
                        <TableCell>
                          {vehicle.isValid ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {vehicle.plateNumber}
                        </TableCell>
                        <TableCell className="capitalize">{vehicle.type}</TableCell>
                        <TableCell>{vehicle.loadCapacity}</TableCell>
                        <TableCell className="max-w-[150px] truncate">
                          {vehicle.operatingZone}
                        </TableCell>
                        <TableCell>
                          {vehicle.errors.length > 0 && (
                            <span className="text-xs text-red-600">
                              {vehicle.errors.join(', ')}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={validVehicles.length === 0}
          >
            Import {validVehicles.length} Vehicles
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
