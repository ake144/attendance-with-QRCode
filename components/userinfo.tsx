import { UserInfo } from "@/types/type";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface UserFormProps {
  memberInfo: UserInfo;
  setMemberInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  handleFormUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserForm: React.FC<UserFormProps> = ({ memberInfo, setMemberInfo, handleFormUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setMemberInfo((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  return (
    <form className="space-y-4" onSubmit={handleFormUpdate}>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" value={memberInfo.name || ""} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={memberInfo.email || ""} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" value={memberInfo.phone || ""} onChange={handleChange} />
      </div>
      <Button type="submit">Update</Button>
    </form>
  );
};

export default UserForm;
