import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ExportOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  format: 'csv' | 'pdf';
}

const exportOptions: ExportOption[] = [
  {
    id: 'sales',
    title: 'Sales Report',
    description: 'Detailed breakdown of all sales including revenue, refunds, and net totals',
    icon: <FileSpreadsheet className="h-8 w-8 text-green-600" />,
    format: 'csv',
  },
  {
    id: 'products',
    title: 'Product Performance',
    description: 'Product analytics including views, conversions, and revenue per item',
    icon: <FileSpreadsheet className="h-8 w-8 text-blue-600" />,
    format: 'csv',
  },
  {
    id: 'orders',
    title: 'Order Summary',
    description: 'Complete order list with status, amounts, and customer information',
    icon: <FileSpreadsheet className="h-8 w-8 text-purple-600" />,
    format: 'csv',
  },
  {
    id: 'statement',
    title: 'Monthly Statement',
    description: 'Official financial statement for accounting and records',
    icon: <FileText className="h-8 w-8 text-primary" />,
    format: 'pdf',
  },
];

export function ExportsDownloads() {
  const [loadingExport, setLoadingExport] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('january-2024');

  const handleExport = async (exportId: string, format: string) => {
    setLoadingExport(exportId);
    
    // Simulate export generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const option = exportOptions.find(o => o.id === exportId);
    
    toast({
      title: 'Export Ready',
      description: `Your ${option?.title} ${format.toUpperCase()} has been generated and will download shortly.`,
    });
    
    setLoadingExport(null);
  };

  const months = [
    { value: 'january-2024', label: 'January 2024' },
    { value: 'december-2023', label: 'December 2023' },
    { value: 'november-2023', label: 'November 2023' },
    { value: 'october-2023', label: 'October 2023' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Export Reports</h3>
        <p className="text-muted-foreground">
          Download your data in CSV or PDF format for record-keeping and analysis.
        </p>
      </div>

      {/* Month Selector for Statements */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label>Statement Period</Label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <div className="grid gap-4 sm:grid-cols-2">
        {exportOptions.map((option) => (
          <Card key={option.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                {option.icon}
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  {option.format}
                </span>
              </div>
              <CardTitle className="text-base mt-3">{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleExport(option.id, option.format)}
                disabled={loadingExport === option.id}
                className="w-full"
                variant={option.format === 'pdf' ? 'default' : 'outline'}
              >
                {loadingExport === option.id ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download {option.format.toUpperCase()}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bulk Export */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bulk Export</CardTitle>
          <CardDescription>
            Download all reports at once in a single ZIP file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="secondary" 
            onClick={() => {
              toast({
                title: 'Bulk Export Started',
                description: 'All reports are being compiled and will download as a ZIP file shortly.',
              });
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download All Reports
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
