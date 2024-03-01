import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input} from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {title: '', description: ''};
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const doUpload = async (inputs) => {
    console.log('inputs', inputs);
    // await postFile();
    // await postMedia();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  return (
    <Card>
      <Card.Image
        onPress={pickImage}
        source={{
          uri: image
            ? image.assets![0].uri
            : 'https://via.placeholder.com/150?text=Choose+media',
        }}
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Title tarttis laittaa',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.title?.message}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 1000,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
            multiline={true}
            numberOfLines={5}
            style={{height: 120, textAlignVertical: 'top'}}
          />
        )}
        name="description"
      />
      <Button title="Upload" onPress={handleSubmit(doUpload)} />
    </Card>
  );
};

export default Upload;
