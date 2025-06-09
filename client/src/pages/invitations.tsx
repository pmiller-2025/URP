import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Copy, Plus, Calendar, Mail, Link } from "lucide-react";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

interface Invitation {
  id: number;
  email: string | null;
  inviteCode: string;
  isUsed: boolean;
  expiresAt: string | null;
  createdAt: string;
  usedBy: string | null;
}

export default function InvitationsPage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [expiresInDays, setExpiresInDays] = useState<number | "">("");

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: invitations = [], isLoading: invitationsLoading } = useQuery<Invitation[]>({
    queryKey: ["/api/invitations"],
    enabled: isAuthenticated,
  });

  const createInvitationMutation = useMutation({
    mutationFn: async (data: { email?: string; expiresInDays?: number }) => {
      return await apiRequest("POST", "/api/invitations", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invitations"] });
      setEmail("");
      setExpiresInDays("");
      toast({
        title: "Invitation Created",
        description: "The invitation has been created successfully.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create invitation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const copyInviteLink = (inviteCode: string) => {
    const inviteUrl = `${window.location.origin}/api/login?invite=${inviteCode}`;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      toast({
        title: "Copied",
        description: "Invite link copied to clipboard.",
      });
    });
  };

  const handleCreateInvitation = () => {
    const data: { email?: string; expiresInDays?: number } = {};
    
    if (email.trim()) {
      data.email = email.trim();
    }
    
    if (expiresInDays && expiresInDays > 0) {
      data.expiresInDays = Number(expiresInDays);
    }

    createInvitationMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">URP Invitation Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create and manage invitations for new users to access URP - your AI retirement planner.
          </p>
        </div>
      </div>

      {/* Create Invitation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Invitation
          </CardTitle>
          <CardDescription>
            Create email-specific invitations or generic invite links that can be shared with anyone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to create a generic invite link that can be used by anyone
              </p>
            </div>
            <div>
              <Label htmlFor="expires">Expires In (Days)</Label>
              <Input
                id="expires"
                type="number"
                placeholder="30"
                value={expiresInDays}
                onChange={(e) => setExpiresInDays(e.target.value ? Number(e.target.value) : "")}
                className="mt-1"
                min="1"
                max="365"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty for no expiration
              </p>
            </div>
          </div>
          <Button 
            onClick={handleCreateInvitation}
            disabled={createInvitationMutation.isPending}
            className="w-full md:w-auto"
          >
            {createInvitationMutation.isPending ? "Creating..." : "Create Invitation"}
          </Button>
        </CardContent>
      </Card>

      {/* Invitations List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Invitations</CardTitle>
          <CardDescription>
            View and manage all invitations you have created.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invitationsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : invitations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No invitations created yet.</p>
              <p className="text-sm">Create your first invitation above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {invitation.email ? (
                            <>
                              <Mail className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Email</span>
                            </>
                          ) : (
                            <>
                              <Link className="h-4 w-4 text-green-600" />
                              <span className="text-sm">Generic</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {invitation.email || (
                          <span className="text-gray-500 italic">Anyone with link</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {invitation.isUsed ? (
                          <Badge variant="secondary">Used</Badge>
                        ) : invitation.expiresAt && new Date() > new Date(invitation.expiresAt) ? (
                          <Badge variant="destructive">Expired</Badge>
                        ) : (
                          <Badge variant="default">Active</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {invitation.expiresAt ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(invitation.expiresAt), "MMM dd, yyyy")}
                          </div>
                        ) : (
                          <span className="text-gray-500">Never</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {format(new Date(invitation.createdAt), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyInviteLink(invitation.inviteCode)}
                          className="flex items-center gap-1"
                        >
                          <Copy className="h-3 w-3" />
                          Copy Link
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}