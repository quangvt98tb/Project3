import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, 
    TextField, EditButton, DisabledInput, 
    TextInput, required } from 'react-admin';

const nameValidation = (value, allValues) => {

    if (!value) {
        return 'required';
    }
    return [];
}

const validateName = [required('Not Empty'), nameValidation];

export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const CategoryEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={validateName} />
            <DisabledInput source="id" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={validateName} />
        </SimpleForm>
    </Create>
);