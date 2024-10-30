// utils/withAuth.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth'); // Redirige a la página de autenticación si no hay token
      } else {
        setLoading(false); // Si hay token, no estamos en modo de carga
      }
    }, [router]);

    // Mientras se está determinando si hay un token, no renderizar el componente
    if (loading) {
      return <div>Cargando...</div>; // O un componente de carga
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
