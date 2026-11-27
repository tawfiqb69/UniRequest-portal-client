"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { ROLES, PHOTO_MAX_SIZE, PHOTO_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

// Check the text fields. Returns one message per wrong field.
const validateForm = ({ name, phone, department, universityId }) => {
  const errors = {};

  if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }
  if (phone.length > 20 || !/^[0-9+\-\s()]*$/.test(phone)) {
    errors.phone = "Phone can have only numbers, +, -, spaces and brackets";
  }
  if (department.length > 100) {
    errors.department = "Department must be 100 characters or less";
  }
  if (universityId.length > 30) {
    errors.universityId = "ID must be 30 characters or less";
  }

  return errors;
};

const ProfileForm = ({ user, refetch }) => {
  // The form starts with the user's saved data 
  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    department: user.department || "",
    universityId: user.universityId || "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // Check the chosen photo (the server checks again)
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    if (!PHOTO_TYPES.includes(file.type)) {
      setErrors((old) => ({ ...old, photo: "Only JPG or PNG images are allowed" }));
      event.target.value = "";
      return;
    }
    if (file.size > PHOTO_MAX_SIZE) {
      setErrors((old) => ({ ...old, photo: "Image must be 5 MB or smaller" }));
      event.target.value = "";
      return;
    }

    setErrors((old) => ({ ...old, photo: "" }));
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validateForm(form);
    setErrors((old) => ({ photo: old.photo, ...newErrors }));
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSaving(true);
    try {
      const body = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        department: form.department.trim(),
        universityId: form.universityId.trim(),
      };

      // 1. If a new photo was chosen, upload it first and get the link
      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        const uploadResult = await apiFetch("/api/upload-photo", { method: "POST", body: formData });
        body.image = uploadResult.data.url;
      }

      // 2. Save the profile
      await apiFetch("/api/users/profile", { method: "PATCH", body: JSON.stringify(body) });

      // 3. Reload the session so the header shows the new name and photo
      await refetch();
      setPhotoFile(null);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message || "Could not update profile");
    } finally {
      setSaving(false);
    }
  };



  const idLabel = user.role === ROLES.STUDENT ? "Student ID" : "Staff ID";
  const shownPhoto = photoPreview || user.image;

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl space-y-5">
      <h1 className="text-2xl font-semibold">Update Profile</h1>

      <div className="flex items-center gap-4">
        {shownPhoto ? (
          <Image src={shownPhoto} alt="Your profile" width={80} height={80} unoptimized className="h-20 w-20 rounded-full object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-xl font-semibold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="space-y-1">
          <Label htmlFor="photo">Profile Photo (JPG or PNG, max 5 MB)</Label>
          <Input id="photo" type="file" accept="image/png,image/jpeg" onChange={handlePhotoChange} />
          {errors.photo && <p className="text-sm text-red-600">{errors.photo}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user.email} readOnly disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" value={user.role} readOnly disabled className="capitalize" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" value={form.phone} onChange={handleChange} aria-invalid={!!errors.phone} />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Input id="department" name="department" value={form.department} onChange={handleChange} aria-invalid={!!errors.department} />
        {errors.department && <p className="text-sm text-red-600">{errors.department}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="universityId">{idLabel}</Label>
        <Input id="universityId" name="universityId" value={form.universityId} onChange={handleChange} aria-invalid={!!errors.universityId} />
        {errors.universityId && <p className="text-sm text-red-600">{errors.universityId}</p>}
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};

const ProfilePage = () => {
  const { data: session, isPending, refetch } = authClient.useSession();

  // Wait for the session, then show the form with the real data
  if (isPending || !session?.user) {
    return <p className="text-sm text-muted-foreground">Loading profile...</p>;
  }

  return <ProfileForm user={session.user} refetch={refetch} />;
};

export default ProfilePage;