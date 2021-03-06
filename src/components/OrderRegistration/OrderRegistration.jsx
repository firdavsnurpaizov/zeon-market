import React, { useEffect, useState } from "react";
import { ReactComponent as Delete } from "./../../assets/svg/delete.svg";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import style from "./OrderRegistration.module.css";
import { getDataFromAPI } from "../../api/api";
import { useSelector } from "react-redux";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value?.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isEmail":
          const reEmail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          reEmail.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        case "isPhone":
          const rePhone = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
          rePhone.test(String(value).toLowerCase())
            ? setPhoneError(false)
            : setPhoneError(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError]);

  return {
    isEmpty,
    minLengthError,
    inputValid,
    emailError,
    phoneError,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e, name) => {
    console.log(e);
    setValue( e?.target?.value);
  };

  const onChangePhone = (e) => {
    setValue(e);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    isDirty,
    onChange,
    onChangePhone,
    onBlur,
    ...valid,
  };
};

const OrderRegistration = ({ setVisible, data, total, order }) => {
  const [checkbox, setCheckbox] = useState(false);

  const { currentUser } = useSelector((state) => state.main);

  // let name, surname, email, phone, country, city

  let name = useInput(currentUser?.name, { isEmpty: true, minLength: 2 });
  const surname = useInput(currentUser?.surname, {
    isEmpty: true,
    minLength: 2,
  });
  const email = useInput(currentUser?.email, { isEmpty: true, isEmail: true });
  const phone = useInput(currentUser?.phone, { isEmpty: true, isPhone: true });
  const country = useInput(currentUser?.country, { isEmpty: true });
  const city = useInput(currentUser?.city, { isEmpty: true });


  const checkboxf = (e) => {
    setCheckbox(e.target.checked);
  };

  const orderP = () => {
    const orderProduct = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone: phone.value,
      country: country.value,
      city: city.value,
      product: data,
      totalPrice: total,
      userId: currentUser.id  
    };
    getDataFromAPI.setOrder(orderProduct);
    order(true);
  };

  //   console.log(orderProduct);

  const classes = [style.btn];
  if (
    name.inputValid &&
    surname.inputValid &&
    email.inputValid &&
    phone.inputValid &&
    country.inputValid &&
    city.inputValid &&
    checkbox
  ) {
    classes.push(style.active);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.OrderRegistration}>
        <h3>???????????????????? ????????????</h3>
        <Delete className={style.delete} onClick={() => setVisible(false)} />
      </div>
      <div className={style.input}>
        <h4
          className={
            name.isDirty && name.isEmpty ? style.errortitle : style.title
          }
        >
          ???????? ??????
        </h4>
        <input
          onBlur={(e) => name.onBlur(e)}
          onChange={(e) => name.onChange(e)}
          value={name.value}
          name="name"
          className={
            name.isDirty && name.isEmpty ? style.error : style.inputItem
          }
          placeholder="???????????????? ????????"
          type="text"
        />
      </div>
       <div className={style.input}>
        <h4
          className={
            surname.isDirty && surname.isEmpty ? style.errortitle : style.title
          }
        >
          ???????? ??????????????
        </h4>
        <input
          onBlur={(e) => surname.onBlur(e)}
          onChange={(e) => surname.onChange(e)}
          value={surname.value}
          name="surname"
          className={
            surname.isDirty && surname.isEmpty ? style.error : style.inputItem
          }
          placeholder="???????????????? ????????????"
          type="text"
        />
      </div> 
       <div className={style.input}>
        <h4
          className={
            email.isDirty && email.emailError ? style.errortitle : style.title
          }
        >
          ?????????????????????? ??????????
        </h4>

        <input
          onBlur={(e) => email.onBlur(e)}
          onChange={(e) => email.onChange(e)}
          value={email.value}
          name="email"
          className={
            email.isDirty && email.emailError ? style.error : style.inputItem
          }
          placeholder="example@mail.com"
          type="email"
        />
      </div> 
       <div className={style.phoneInput}>
        <h4
          className={
            phone.isDirty && phone.isEmpty ? style.errortitle : style.title
          }
        >
          ?????? ?????????? ????????????????
        </h4> 
       <div
          className={
            phone.isDirty && phone.phoneError
              ? style.errorPhone
              : style.phoneWrapper
          }
        >
          <PhoneInput
            value={phone?.value}
            onBlur={(e) => phone.onBlur(e)}
            onChange={(e) => phone.onChangePhone(e)}
            international
            defaultCountry="KG"
            name="phone"
            className={style.PhoneInput}
            placeholder="?????????????? ?????????? ????????????????"
            style={{ border: "none", outline: "none" }}
          />
        </div> 
       {/* <input
          onBlur={(e) => phone.onBlur(e)}
          onChange={(e) => phone.onChange(e)}
          value={phone.value}
          name="phone"
          className={
            phone.isDirty && phone.phoneError ? style.error : style.inputItem
          }
          placeholder="?????????????? ?????????? ????????????????"
          type="text"
        />  */}
       </div> 
     <div className={style.input}>
        <h4
          className={
            country.isDirty && country.isEmpty ? style.errortitle : style.title
          }
        >
          ????????????
        </h4>
        <input
          onBlur={(e) => country.onBlur(e)}
          onChange={(e) => country.onChange(e)}
          value={country.value}
          name="country"
          className={
            country.isDirty && country.isEmpty ? style.error : style.inputItem
          }
          placeholder="?????????????? ????????????"
          type="text"
        />
      </div> 
       <div className={style.input}>
        <h4
          className={
            city.isDirty && city.isEmpty ? style.errortitle : style.title
          }
        >
          ??????????
        </h4>
        <input
          onBlur={(e) => city.onBlur(e)}
          onChange={(e) => city.onChange(e)}
          value={city.value}
          name="city"
          className={
            city.isDirty && city.isEmpty ? style.error : style.inputItem
          }
          placeholder="?????????????? ??????????"
          type="text"
        /> 
       </div>
      <div className={style.agree}>
        <input
          type="checkbox"
          name="checkbox"
          onChange={(e) => checkboxf(e)}
          className={style.checkbox}
        />
        <h4>
          ???????????????? ?? ?????????????????? <Link to="/public">?????????????????? ????????????</Link>
        </h4>
      </div> 

       <button
        disabled={
          !name.inputValid ||
          !surname.inputValid ||
          !email.inputValid ||
          !phone.inputValid ||
          !country.inputValid ||
          !city.inputValid ||
          !checkbox
        }
        className={classes.join(" ")}
        onClick={orderP}
      >
        <span>????????????????</span>
      </button> 
    </div>
  );
};

export default OrderRegistration;
