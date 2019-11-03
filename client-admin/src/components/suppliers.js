import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';

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
            <TextField source="name" />
            <TextField source="email" type="email" />
            <TextField source="address" />
            <TextField source="phone" />
            <DisabledInput source="id" />
        </SimpleForm>
    </Edit>
);
export const SuppliersCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" type="email" />
            <TextInput source="address" />
            <TextInput source="phone" />
        </SimpleForm>
    </Create>
);
