import axios from "axios";
import Joi from "joi";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
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
    const result = validateRegistration(user);

    if (result.error) {
      loading(false);
      setErrorList(result.error.details);
      console.log(result.error.details);
    } else {
      loading(true);
      const { data } = await axios.post("https://movies-czdp.onrender.com/signup", user);
      console.log(data);
      if (data.message === "success") {
        loading(false);
        navigate("/login");
      } else {
        loading(false);
        setError(data.message);
      }
    }
  }
  function validateRegistration(user: { first_name: string; last_name: string; age: number; email: string; password: string }) {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(8).required(),
      last_name: Joi.string().alphanum().min(3).max(8).required(),
      age: Joi.number().min(16).required(),
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
                password length must be 8 and include
                <ul>
                  <li> at least 1 lowercase </li>
                  <li> at least 1 uppercase </li>
                  <li> at least 1 numeric character</li>
                  <li> at least one special character </li>
                </ul>
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
        <h2 className="my-3 ">Register now</h2>
        <label htmlFor="first_name">first_name :</label>
        <input type="text" className="form-control my-3" name="first_name" id="first_name" onChange={getUser} />
        <label htmlFor="last_name">last_name :</label>
        <input type="text" className="form-control my-3" name="last_name" id="last_name" onChange={getUser} />
        <label htmlFor="age">age :</label>
        <input type="number" className="form-control my-3" name="age" id="age" onChange={getUser} />
        <label htmlFor="email">email :</label>
        <input type="email" className="form-control my-3" name="email" id="email" onChange={getUser} />
        <label htmlFor="password">password :</label>
        <input type="password" className="form-control my-3" name="password" id="password" onChange={getUser} />
        <button className="btn btn-outline-info" type="submit">
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
        </button>
      </form>
    </>
  );
}
