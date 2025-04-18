import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const types = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

const CommonForm = ({ formControls,formData,setFormData,onSubmit,buttonText,isBtnDisabled }) => {
  function renderInputComponentType(getControlItem) {
    let element = null;
    const value=formData[getControlItem.name] || '';
    switch (getControlItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={getControlItem?.name}
            placeholder={getControlItem?.placeHolder}
            id={getControlItem?.name}
            type={getControlItem?.type}
            autoComplete="current-password"
            value={value}
            onChange={event=>setFormData({
                ...formData,
                [getControlItem.name]:event?.target?.value
            })}
          />
        );
        break;
      case types.SELECT:
        element = (
          <Select
            onValueChange={(value)=>setFormData({
                ...formData,
                [getControlItem?.name]:value
            })}
            value={value}
          >
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder={getControlItem?.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem?.options && getControlItem?.options.length > 0
                ? getControlItem?.options.map((optionItem) => (
                    <SelectItem key={optionItem?.id} value={optionItem?.id}>
                      {optionItem?.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case types.TEXTAREA:
        element = (
          <Textarea
            name={getControlItem?.name}
            placeholder={getControlItem?.placeHolder}
            id={getControlItem?.name}
            value={value}
            onChange={event=>setFormData({
                ...formData,
                [getControlItem.name]:event?.target?.value
            })}
          />
        );
        break;
      default:
        element = (
          <Input
            name={getControlItem?.name}
            placeholder={getControlItem?.placeHolder}
            id={getControlItem?.name}
            type={getControlItem?.type}
            value={value}
            onChange={event=>setFormData({
                ...formData,
                [getControlItem.name]:event?.target?.value
            })}
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}> 
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className={"mb-1"}>{controlItem?.label}</Label>
            {renderInputComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className={'mt-2 w-full'}>{buttonText || 'Submit'}</Button>
    </form>
  );
};

export default CommonForm;
