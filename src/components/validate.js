export const validate = (data, type) => {
  const errors = {};

  if (!data.email) {
    errors.email = "ایمیل باید وارد شود";
    // eslint-disable-next-line no-useless-escape
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    errors.email = "ایمیل وارد شده معتبر نیست";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "رمز عبور باید وارد شود";
  } else if (data.password.length <= 6) {
    errors.password = "طول رمز عبور شما باید بیشتر از 6 حرف باشد";
  } else {
    delete errors.password;
  }

  if (type === "signup") {
    if (!data.name.trim()) {
      errors.name = "نام باید وارد شود";
    } else {
      delete errors.name;
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "رمز عبور را مجددا وارد نمایید";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "رمز عبور وارد شده مطابقت ندارد !";
    } else {
      delete errors.confirmPassword;
    }

    if (data.isAccepted) {
      delete errors.isAccepted;
    } else {
      errors.isAccepted = "شما باید قوانین سایت را قبول کنید";
    }
  }

  return errors;
};
