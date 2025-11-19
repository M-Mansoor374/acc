// Quick Admin Test Script
// Copy and paste this entire script into your browser console

// Set admin credentials
sessionStorage.setItem('acceptopia-authenticated', 'true');
sessionStorage.setItem('acceptopia-role', 'admin');

// Navigate to admin dashboard
window.location.href = '/admin';

// Verify admin status
console.log('✅ Admin role set:', sessionStorage.getItem('acceptopia-role'));
console.log('✅ Authenticated:', sessionStorage.getItem('acceptopia-authenticated'));




