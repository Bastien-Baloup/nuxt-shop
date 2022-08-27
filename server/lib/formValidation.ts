export const validateEmail = (email: string): boolean => {
  if (!email) {
    return false
  }
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}
