import { useState, useRef } from 'react';
import { Upload, Download, FileText, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { generateCSVTemplate, validateVehicleCSV } from '@/data/adminData';
import { toast } from 'sonner';

interface AdminVehicleCSVImportProps {
  open: boolean;
  onClose: () => void;
}

interface ParsedRow {
  data: string[];
  valid: boolean;
  errors: string[];
}

export function AdminVehicleCSVImport({ open, onClose }: AdminVehicleCSVImportProps) {
  const [step, setStep] = useState<'upload' | 'preview' | 'summary'>('upload');
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [importResults, setImportResults] = useState<{ success: number; failed: number }>({ success: 0, failed: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = () => {
    const csv = generateCSVTemplate();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vehicle_import_template.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Template downloaded');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter((line) => line.trim());
      
      // Skip header row
      const dataRows = lines.slice(1);
      
      const parsed: ParsedRow[] = dataRows.map((line) => {
        const cells = line.split(',').map((cell) => cell.trim());
        const validation = validateVehicleCSV(cells);
        return {
          data: cells,
          valid: validation.valid,
          errors: validation.errors,
        };
      });

      setParsedData(parsed);
      setStep('preview');
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    // Simulate import
    const validRows = parsedData.filter((row) => row.valid);
    const invalidRows = parsedData.filter((row) => !row.valid);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setImportResults({
      success: validRows.length,
      failed: invalidRows.length,
    });
    setStep('summary');
  };

  const handleClose = () => {
    setStep('upload');
    setParsedData([]);
    setImportResults({ success: 0, failed: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const validCount = parsedData.filter((row) => row.valid).length;
  const invalidCount = parsedData.filter((row) => !row.valid).length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Vehicles from CSV
          </DialogTitle>
          <DialogDescription>
            {step === 'upload' && 'Upload a CSV file to bulk import vehicles to your fleet.'}
            {step === 'preview' && 'Review the data before importing.'}
            {step === 'summary' && 'Import completed.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'upload' && (
          <div className="py-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Step 1: Download Template</CardTitle>
                <CardDescription>
                  Download the CSV template and fill in your vehicle data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={handleDownloadTemplate}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Step 2: Upload File</CardTitle>
                <CardDescription>
                  Upload your completed CSV file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Click to select a CSV file or drag and drop
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">CSV Format:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>plate_number, type, capacity_kg, region, district, ward, status</li>
                <li>Type: bike, car, van, truck</li>
                <li>Status: active, inactive (defaults to active)</li>
                <li>Ward is optional</li>
              </ul>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="py-4 space-y-4">
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {validCount} Valid
              </Badge>
              {invalidCount > 0 && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {invalidCount} Invalid
                </Badge>
              )}
            </div>

            <div className="border rounded-lg overflow-hidden max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Status</TableHead>
                    <TableHead>Plate</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Errors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedData.map((row, index) => (
                    <TableRow key={index} className={!row.valid ? 'bg-red-50 dark:bg-red-950/20' : ''}>
                      <TableCell>
                        {row.valid ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{row.data[0]}</TableCell>
                      <TableCell className="text-sm">{row.data[1]}</TableCell>
                      <TableCell className="text-sm">{row.data[2]} kg</TableCell>
                      <TableCell className="text-sm">{row.data[3]}</TableCell>
                      <TableCell className="text-sm">{row.data[4]}</TableCell>
                      <TableCell className="text-xs text-red-600">
                        {row.errors.join(', ')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {invalidCount > 0 && (
              <p className="text-sm text-amber-600">
                ⚠️ {invalidCount} row(s) have errors and will be skipped during import.
              </p>
            )}
          </div>
        )}

        {step === 'summary' && (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-600" />
            <div>
              <p className="text-lg font-semibold">Import Complete</p>
              <p className="text-muted-foreground">
                {importResults.success} vehicle(s) imported successfully
              </p>
              {importResults.failed > 0 && (
                <p className="text-red-600 text-sm">
                  {importResults.failed} row(s) failed to import
                </p>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          {step === 'upload' && (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}
          {step === 'preview' && (
            <>
              <Button variant="outline" onClick={() => setStep('upload')}>
                Back
              </Button>
              <Button onClick={handleImport} disabled={validCount === 0}>
                Import {validCount} Vehicle(s)
              </Button>
            </>
          )}
          {step === 'summary' && (
            <Button onClick={handleClose}>
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
