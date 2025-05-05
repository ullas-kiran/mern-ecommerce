import CommonForm from "@/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"

const initialState = {
  username: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate=useNavigate();
  const dipsatch=useDispatch();
  function onSubmit(event) {
    event?.preventDefault()
    dipsatch(registerUser(formData)).then((data)=> {
     if(data?.payload?.password){
       navigate('/auth/login')
       toast("Event has been created.")
     }
    
    })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to={"/auth/login"}
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        onSubmit={onSubmit}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default AuthRegister;
