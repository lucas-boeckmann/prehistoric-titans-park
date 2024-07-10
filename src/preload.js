// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

window.addEventListener('DOMContentLoaded', () => {
    // Verifique se as funcionalidades existem
    console.log('Autofill.enable', typeof window.Autofill?.enable);
    console.log('Autofill.setAddresses', typeof window.Autofill?.setAddresses);
  
    if (typeof window.Autofill?.enable !== 'function') {
      console.warn('Autofill.enable não está disponível.');
    }
  
    if (typeof window.Autofill?.setAddresses !== 'function') {
      console.warn('Autofill.setAddresses não está disponível.');
    }
  });
  