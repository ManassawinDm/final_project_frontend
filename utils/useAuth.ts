import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from './api';

export const useAuth = () => {
  const [user, setUser] = useState<{ email: string; role: string; status: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/me'); // ตรวจสอบ Token
        setUser(res.data);

        // ถ้า `status !== active` → ไปหน้าเปลี่ยน Email/Password
        if (res.data.status !== 'active') {
          router.push('/auth/change-credentials');
        }
      } catch (error) {
        setUser(null);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    router.push('/auth/login');
  };

  return { user, loading, logout };
};
