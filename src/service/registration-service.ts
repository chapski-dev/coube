export const registrationService = () => {
  let _phone = '';
  let _iin = '';
  let _firstName = '';
  let _surname = '';
  let _middleName = '';
  let _pasportIssuedBy = '';
  let _citizenship = '';


  const setPhone = (phone: string) => {_phone  = phone;};
  const setIin = (iin: string) => {_iin  = iin;};
  const setFirstName = (firstName: string) => {_firstName  = firstName;};
  const setSurname = (surname: string) => {_surname  = surname;};
  const setMiddleName = (middleName: string) => {_middleName  = middleName;};

  const setPasportIssuedBy = (pasportIssuedBy: string) => {_pasportIssuedBy  = pasportIssuedBy;};

  const getUserData = () => ({
    phone: _phone,
    iin: _iin,
    firstName: _firstName,
    surname: _surname,
    middleName: _middleName,
    citizenship: _citizenship,
    pasportIssuedBy: _pasportIssuedBy,
  });

  const wipeData = () => {
    _phone = '';
    _iin = '';
    _firstName = '';
    _surname = '';
    _middleName = '';
    _pasportIssuedBy = '';
    _citizenship = '';
  };

  return {
    setPhone,
    setIin,
    setFirstName,
    setSurname,
    setMiddleName,
    setPasportIssuedBy,
    getUserData,
    wipeData,
  };
};
