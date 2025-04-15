import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const { username } = location.state || { username: 'Kullanıcı' };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hesabınız başarıyla oluşturulmuştur, {username}!</h1>
      <p>Kullanıcı arayüzüne gitmek için <Link to="/dashboard">buraya tıklayın</Link>.</p>
    </div>
  );
};

export default SuccessPage;