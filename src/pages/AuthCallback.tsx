import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      const { hash, searchParams } = new URL(window.location.href);
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        console.error('Error during authentication:', error, errorDescription);
        navigate('/login', { state: { error: errorDescription || 'Authentication failed' } });
        return;
      }

      // If there's a hash in the URL, it might contain the access token
      if (hash) {
        // Let Supabase handle the hash fragment
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error.message);
          navigate('/login');
          return;
        }

        if (data?.session) {
          // Successfully authenticated
          navigate('/dashboard');
          return;
        }
      }

      // If we get here, something unexpected happened
      navigate('/login');
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Completing authentication...</h2>
        <p className="text-muted-foreground">Please wait while we log you in.</p>
      </div>
    </div>
  );
}