import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SecurityAlert = () => {
  return (
    <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <AlertTriangle className="h-5 w-5" />
          Security Configuration Required
        </CardTitle>
        <CardDescription className="text-amber-700 dark:text-amber-300">
          Please complete these security settings in your Supabase dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-amber-200 bg-amber-100 dark:border-amber-700 dark:bg-amber-900">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Authentication Settings</AlertTitle>
          <AlertDescription className="mt-2 space-y-2">
            <div>
              <strong>1. Reduce OTP Expiry Time:</strong>
              <p className="text-sm">Go to Authentication → Settings → Auth Configuration</p>
              <p className="text-sm">Set OTP expiry to 10 minutes or less</p>
            </div>
            <div className="mt-3">
              <strong>2. Enable Leaked Password Protection:</strong>
              <p className="text-sm">Go to Authentication → Settings → Security</p>
              <p className="text-sm">Enable "Leaked password protection"</p>
            </div>
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://supabase.com/docs/guides/platform/going-into-prod#security', '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Security Guide
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection', '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Password Security
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityAlert;