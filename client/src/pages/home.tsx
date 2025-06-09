import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Calculator, User, LogOut, Users } from "lucide-react";
import { Link } from "wouter";
import { User as UserType } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  const typedUser = user as UserType | undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">URP - Ultimate Retirement Planner</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {typedUser?.profileImageUrl ? (
                  <img 
                    src={typedUser.profileImageUrl} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-gray-600" />
                )}
                <span className="text-sm text-gray-700">
                  {typedUser?.firstName || typedUser?.email || 'User'}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/api/logout'}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome back, {typedUser?.firstName || 'there'}!
          </h1>
          <p className="text-lg text-gray-600">
            URP is ready to help you plan your retirement with advanced AI insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-6 w-6 text-green-600 mr-2" />
                Retirement Calculator
              </CardTitle>
              <CardDescription>
                Create detailed retirement projections with mortgage acceleration, 
                Social Security optimization, and investment strategies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/calculator">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Open Calculator
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 text-purple-600 mr-2" />
                Invite Management
              </CardTitle>
              <CardDescription>
                Create and manage invitations for new users to access URP.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/invitations">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Manage Invites
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-6 w-6 text-blue-600 mr-2" />
                Your Profile
              </CardTitle>
              <CardDescription>
                Account settings and saved scenarios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Email:</strong> {typedUser?.email || 'Not provided'}</p>
                <p><strong>Name:</strong> {typedUser?.firstName && typedUser?.lastName 
                  ? `${typedUser.firstName} ${typedUser.lastName}` 
                  : 'Not provided'}</p>
                <p><strong>Member since:</strong> {typedUser?.createdAt 
                  ? new Date(typedUser.createdAt).toLocaleDateString() 
                  : 'Recently'}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Your data is private and secure. Only you can access your retirement scenarios.
          </p>
        </div>
      </main>
    </div>
  );
}