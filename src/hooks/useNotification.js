function useNotification(ref) {
  const addToast = (message = '', mode = '') => {
    if (message === '') {
      message = 'Message';
    }
    ref.current.addMessage({ mode: mode, message: message });
  };
  return addToast;
}

export default useNotification;
