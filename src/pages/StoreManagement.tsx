import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Store, User, Palette, FileText, Building2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import StoreOverview from '@/components/store/StoreOverview';
import StoreProfile from '@/components/store/StoreProfile';
import StoreBranding from '@/components/store/StoreBranding';
import StorePolicies from '@/components/store/StorePolicies';
import BusinessDetails from '@/components/store/BusinessDetails';
import { mockStoreInfo, StoreInfo } from '@/data/mockData';

const tabs = [
  { value: 'overview', label: 'Overview', icon: Store },
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'branding', label: 'Branding', icon: Palette },
  { value: 'policies', label: 'Policies', icon: FileText },
  { value: 'business', label: 'Business Details', icon: Building2 },
];

export default function StoreManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(mockStoreInfo);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const currentTab = searchParams.get('tab') || 'overview';

  // Handle unsaved changes warning when navigating away
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleTabChange = (newTab: string) => {
    if (hasUnsavedChanges && newTab !== currentTab) {
      setPendingTab(newTab);
      setShowLeaveDialog(true);
    } else {
      setSearchParams({ tab: newTab });
    }
  };

  const handleNavigate = (tab: string) => {
    if (hasUnsavedChanges) {
      setPendingNavigation(tab);
      setShowLeaveDialog(true);
    } else {
      setSearchParams({ tab });
    }
  };

  const confirmLeave = () => {
    setHasUnsavedChanges(false);
    if (pendingTab) {
      setSearchParams({ tab: pendingTab });
      setPendingTab(null);
    }
    if (pendingNavigation) {
      setSearchParams({ tab: pendingNavigation });
      setPendingNavigation(null);
    }
    setShowLeaveDialog(false);
  };

  const cancelLeave = () => {
    setPendingTab(null);
    setPendingNavigation(null);
    setShowLeaveDialog(false);
  };

  const handleStoreUpdate = (updatedStore: StoreInfo) => {
    setStoreInfo(updatedStore);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full justify-start bg-muted/50 p-1 h-auto flex-wrap gap-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2 data-[state=active]:bg-background"
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview" className="m-0">
            <StoreOverview store={storeInfo} onNavigate={handleNavigate} />
          </TabsContent>

          <TabsContent value="profile" className="m-0">
            <StoreProfile 
              store={storeInfo} 
              onUpdate={handleStoreUpdate}
              hasUnsavedChanges={hasUnsavedChanges}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          </TabsContent>

          <TabsContent value="branding" className="m-0">
            <StoreBranding 
              store={storeInfo} 
              onUpdate={handleStoreUpdate}
              hasUnsavedChanges={hasUnsavedChanges}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          </TabsContent>

          <TabsContent value="policies" className="m-0">
            <StorePolicies store={storeInfo} />
          </TabsContent>

          <TabsContent value="business" className="m-0">
            <BusinessDetails store={storeInfo} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelLeave}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLeave} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Leave Without Saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
