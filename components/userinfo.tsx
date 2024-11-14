import { UserInfo } from "@/types/type";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface UserFormProps {
  memberInfo: UserInfo;
  setMemberInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  handleFormUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserForm: React.FC<UserFormProps> = ({ memberInfo, setMemberInfo, handleFormUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'file' && (e.target as HTMLInputElement).files) {
      const files = (e.target as HTMLInputElement).files;
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberInfo((prev) => (prev ? { ...prev, [name]: reader.result as string } : null));
      };
      if(files)
      reader.readAsDataURL(files[0]);
    } else {
      setMemberInfo((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleFormUpdate}>
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={memberInfo.name || ""} onChange={handleChange} required />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={memberInfo.email || ""} onChange={handleChange} required />
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel" value={memberInfo.phone || ""} onChange={handleChange} required />
      </div>

      {/* Profile Picture */}
      <div className="space-y-2">
        <Label htmlFor="profilePic">Profile Picture</Label>
        <Input id="profilePic" name="profilePic" type="file" accept="image/*" onChange={handleChange} />
        {memberInfo.profilePic && (
          <img src={memberInfo.profilePic} alt="Profile Preview" className="mt-2 h-24 w-24 object-cover rounded-full" />
        )}
      </div>

      {/* Age */}
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input id="age" name="age" type="number" min="0" value={memberInfo.age || ""} onChange={handleChange} />
      </div>

      {/* Marital Status */}
      <div className="space-y-2">
        <Label htmlFor="maritalStatus">Marital Status</Label>
        <select id="maritalStatus" name="maritalStatus" value={memberInfo.maritalStatus || ""} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Widowed">Widowed</option>
        </select>
      </div>

      {/* Sex */}
      <div className="space-y-2">
        <Label htmlFor="sex">Sex</Label>
        <select id="sex" name="sex" value={memberInfo.sex || ""} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" name="address" value={memberInfo.address || ""} onChange={handleChange} />
      </div>

      {/* Occupation */}
      <div className="space-y-2">
        <Label htmlFor="occupation">Occupation</Label>
        <Input id="occupation" name="occupation" value={memberInfo.occupation || ""} onChange={handleChange} />
      </div>

      {/* Submit Button */}
      <Button type="submit">Update</Button>
    </form>
  );
};

export default UserForm;
