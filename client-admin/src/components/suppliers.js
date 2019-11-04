import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, 
        DateField, TextField, EditButton, DisabledInput, 
        TextInput, LongTextInput, DateInput, required, email, number } from 'react-admin';

const validateName = [required()];
const validateEmail= email();
const validatePhone = [number('Nhap dung sdt')];

export const SuppliersList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="email"/>
            <TextField source="address" />
            <TextField source="phone" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const SuppliersEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={validateName} />
            <TextInput source="email" validate={validateEmail} />
            <TextInput source="address" />
            <TextInput source="phone" validate={validatePhone} />
            <DisabledInput source="id" />
        </SimpleForm>
    </Edit>
);
export const SuppliersCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={validateName} />
            <TextInput source="email" type="email" validate={validateEmail} />
            <TextInput source="address" />
            <TextInput source="phone" validate={validatePhone} />
        </SimpleForm>
    </Create>
);
