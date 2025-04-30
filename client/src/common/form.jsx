import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const types={
    INPUT:'input',
    SELECT:'select',
    TEXTAREA:'textarea'
}

const CommonForm = ({ formControls }) => {
  function renderInputComponentType(getControlItem) {
    let element = null;
    switch (getControlItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={getControlItem?.name}
            placeholder={getControlItem?.placeHolder}
            id={getControlItem?.name}
            type={getControlItem?.type}
          />
        );
        break;
        case types.SELECT:
        element = (
          <Input
            name={getControlItem?.name}
            placeholder={getControlItem?.placeHolder}
            id={getControlItem?.name}
            type={getControlItem?.type}
          />
        );
        break;
        case types.TEXTAREA:
        element = (
          <Input
            name={getControlItem?.name}
            placeholder={getControlItem?.placeHolder}
            id={getControlItem?.name}
            type={getControlItem?.type}
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
            />
          );
        break;
    }

    return element;
  }

  return (
    <form>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className={"mb-1"}>{controlItem?.label}</Label>
            {renderInputComponentType(controlItem)}
          </div>
        ))}
      </div>
    </form>
  );
};

export default CommonForm;
