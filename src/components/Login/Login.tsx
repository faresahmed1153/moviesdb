import axios from "axios";
import Joi from "joi";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
interface ILogin {
  getUserData: () => void;
}
// interface IJoiError {
//   name: string;
//   isJoi: boolean;
//   details: [];
//   message: string;
//   path: [];
//   type: string;
//   context: object;
//   key: string;
//   label: string;
//   value: string;
//   annotate: () => string;
// }
export default function Login({ getUserData }: ILogin) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, loading] = useState(false);
  const [errorList, setErrorList] = useState<Joi.ValidationErrorItem[] | []>([]);
  function getUser(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.currentTarget.name]: e.target.value });
  }
  async function submit(e: FormEvent) {
    e.preventDefault();
    loading(true);
    const result = validateLogin(user);

    if (result.error) {
      loading(false);
      setErrorList(result.error.details);
    } else {
      loading(true);
      const { data } = await axios.post("https://movies-czdp.onrender.com/signin", user);
      if (data.message === "success") {
        loading(false);
        localStorage.setItem("userToken", data.token);
        getUserData();
        navigate("/home");
      } else {
        loading(false);
        setError(data.message);
      }
    }
  }
  function validateLogin(user: { email: string; password: string }) {
    let schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <>
      <form className="py-4" onSubmit={submit}>
        {errorList.map((item, index) => {
          if (item.message.includes("password")) {
            return (
              <div key={index} className="alert alert-danger">
                invalid password
              </div>
            );
          } else {
            return (
              <div key={index} className="alert alert-danger">
                {item.message}
              </div>
            );
          }
        })}
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <h2 className="my-3 ">Login</h2>

        <label htmlFor="email">email :</label>
        <input type="email" className="form-control my-3" name="email" id="email" onChange={getUser} />
        <label htmlFor="password">password :</label>
        <input type="password" className="form-control my-3" name="password" id="password" onChange={getUser} />
        <button className="btn btn-outline-info" type="submit">
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
      </form>
    </>
  );
}
