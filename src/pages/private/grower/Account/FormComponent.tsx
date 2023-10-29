import React, { useState } from 'react';
import { Stack, Input, NumberInput, Textarea, Button, Select, Group } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    major: '',
    bio: '',
    interests: '',
    gpa: '',
    resume: '',
    
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission here
    console.log(formData);
  };

    function handleDrop(files: FileWithPath[]): void {
        throw new Error('Function not implemented.');
    }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="xs">
        <Textarea
          label="Major"
          placeholder="Enter your major"
          value={formData.major}
          onChange={(e) => setFormData((prev) => ({ ...prev, major: e.currentTarget.value }))}
        />


        <Textarea
          label="Brief Bio"
          placeholder="Tell us a bit about yourself"
          minRows={3}
          value={formData.bio}
          onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.currentTarget.value }))}
        />


        <Textarea
          label="Interests/Hobbies"
          placeholder="List some of your interests or hobbies"
          minRows={3}
          value={formData.interests}
          onChange={(e) => setFormData((prev) => ({ ...prev, interests: e.currentTarget.value }))}
        />

        <Textarea
          label="Current GPA"
          placeholder="What is your GPA on the 4.0 scale?"
          value={formData.interests}
          onChange={(e) => setFormData((prev) => ({ ...prev, interests: e.currentTarget.value }))}
        />
        
     
        <Dropzone
            onDrop={handleDrop}
            accept={[".pdf", ".doc", ".docx"]}
            maxSize={5 * 1024 * 1024} // 5 MB
            multiple={false}
        >

        </Dropzone>



        <Button type="submit" variant="outline" style={{ alignSelf: 'center' }}>
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default FormComponent;
