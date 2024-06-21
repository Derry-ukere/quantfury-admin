/* eslint-disable arrow-body-style */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography, Stack,Alert } from '@mui/material';

//
import UploadAvatar from  './UploadAvatar';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { uploadIds } from '../../redux/slices/uploads/uploadId';

const Identity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, isLoading } = useSelector((state) => state.uploadId);

  const [fileOne, setFileOne] = React.useState(null)
  const [fileTwo, setFileTwo] = React.useState(null)

  const [avatarFrontUrl, setfrontAvatarUrl] = React.useState(null);
  const [avatarBackUrl, setBackAvatarUrl] = React.useState(null);

  const handleFrontDropAvatar = React.useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setFileOne(file)
      setfrontAvatarUrl(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const handleBackDropAvatar = React.useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setFileTwo(file)
      setBackAvatarUrl(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(uploadIds(fileOne, fileTwo))
  }

  React.useEffect(() => {
    if (success) {
      navigate('/user');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  return (
    <div>
    {success && <Alert severity="success" >ID Card Uploaded,We'll notify you of the outcome as soon as possible.</Alert>}

      <br />
      <div className="row">
        <div className="col l4 s12 offset-l4">
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <div>
                    <div className="file-field input-field">
                      <UploadAvatar
                        accept="image/*"
                        file={avatarFrontUrl}
                        onDrop={handleFrontDropAvatar}
                        helperText={
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 2,
                              mx: 'auto',
                              display: 'block',
                              textAlign: 'center',
                              color: 'text.secondary',
                            }}
                          >
                            Upload front ID -- Allowed *.jpeg, *.jpg, *.png, *.gif
                            <br /> max size of 1mb
                          </Typography>
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="file-field input-field">
                      <UploadAvatar
                        accept="image/*"
                        file={avatarBackUrl}
                        onDrop={handleBackDropAvatar}
                        helperText={
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 2,
                              mx: 'auto',
                              display: 'block',
                              textAlign: 'center',
                              color: 'text.secondary',
                            }}
                          >
                            Upload back ID -- Allowed *.jpeg, *.jpg, *.png, *.gif
                            <br /> max size of 1mb
                          </Typography>
                        }
                      />
                    </div>
                  </div>
                </Stack>

                <div>
                  <LoadingButton type="submit" variant='contained' fullWidth color='info' loading={isLoading}>
                    Upload
                  </LoadingButton>
                </div>
              </form>
        </div>
      </div>
    </div>
  );
};

export default Identity;
