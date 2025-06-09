import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, CheckCircle, XCircle, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface InvitePageProps {
  params: { code: string };
}

interface InviteResponse {
  valid: boolean;
  message?: string;
  invitation?: {
    id: number;
    email: string | null;
    inviteCode: string;
    expiresAt: string | null;
  };
}

export default function InvitePage({ params }: InvitePageProps) {
  const { code } = params;
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [loginUrl, setLoginUrl] = useState("");

  const { data: inviteData, isLoading, error } = useQuery<InviteResponse>({
    queryKey: [`/api/validate-invite/${code}`],
    enabled: !!code,
  });

  useEffect(() => {
    if (code) {
      setLoginUrl(`/api/login?invite=${code}`);
    }
  }, [code]);

  // If user is already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Bot className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600 dark:text-gray-400">Checking invitation...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isValid = inviteData?.valid;
  const invitation = inviteData?.invitation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <Bot className="h-16 w-16 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            You're Invited to Meet URP!
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Your friendly robot retirement planning assistant
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          {isValid ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Valid Invitation</p>
                  {invitation?.email ? (
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Invited: {invitation.email}
                    </p>
                  ) : (
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Open invitation - anyone can join
                    </p>
                  )}
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Beep boop! URP is excited to help you plan your retirement with advanced AI-powered calculations and friendly robot guidance.
                </p>

                <Button
                  onClick={() => window.location.href = loginUrl}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  size="lg"
                >
                  <Bot className="h-5 w-5 mr-2" />
                  Meet URP - Sign In to Continue
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing in, you'll get access to URP's retirement calculator, scenario planning, and AI-powered financial insights.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-800 dark:text-red-200">Invalid Invitation</p>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    {error?.message || inviteData?.message || "This invitation is no longer valid"}
                  </p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Beep boop! URP says this invitation link has expired or been used already.
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please ask the person who invited you for a new invitation link.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}