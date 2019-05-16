import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/fontawesome-pro-solid';
import { Formik, Form, Field } from 'formik';
import * as firebase from 'firebase/app';

import IconButton from './shared/IconButton';
import ToggleContent from './ToggleContent';
import Section from './shared/Section';
import Button from './shared/Button';
import Modal from './shared/Modal';
import FormikInput from './shared/FormikInput';
import Label from './shared/Label';

const Sync = () => (
  <span>
    <ToggleContent
      toggle={({ show }) => (
        <IconButton onClick={show}>
          <FontAwesome icon={faSyncAlt} />
        </IconButton>
      )}
      content={({ hide }) => (
        <Modal title="Sync" onClose={hide}>
          <>
            <Section margin="sm">
              <Formik initialValues={{ email: '', password: '' }} onSubmit={() => {}}>
                {() => (
                  <Form>
                    <Section margin="sm">
                      <Label>E-mail</Label>
                      <Field type="email" name="email" component={FormikInput} />
                    </Section>
                    <Section margin="md">
                      <Label>Password</Label>
                      <Field type="password" name="password" component={FormikInput} />
                    </Section>
                    <Button type="submit">Sign up</Button>
                  </Form>
                )}
              </Formik>
            </Section>
            <Button type="button" danger onClick={googleLogin}>
              Google login
            </Button>
          </>
        </Modal>
      )}
    />
  </span>
);

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider);
}

Sync.propTypes = {
  signUp: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default React.memo(Sync);
