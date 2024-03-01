import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input} from '@rneui/base';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
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

  return (
    <Card>
      <Card.Image
        source={{uri: 'https://via.placeholder.com/150?text=Choose+media'}}
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
