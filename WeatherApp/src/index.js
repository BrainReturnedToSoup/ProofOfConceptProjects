import { Form } from "./modules/Simple-Form-Module";

const newForm = new Form(["password", "confirmPassword"], "#", "post", "Sign In!")

newForm.appendForm(document.body);