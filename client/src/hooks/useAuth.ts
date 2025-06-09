import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  // Try OAuth first, then fallback to dev auth
  const { data: oauthUser, isLoading: oauthLoading, error: oauthError } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  const { data: devUser, isLoading: devLoading } = useQuery({
    queryKey: ["/api/dev/user"],
    retry: false,
    enabled: !oauthUser && !oauthLoading, // Only try dev auth if OAuth failed
  });

  const user = oauthUser || devUser;
  const isLoading = oauthLoading || devLoading;

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    authMethod: oauthUser ? 'oauth' : devUser ? 'dev' : null,
  };
}