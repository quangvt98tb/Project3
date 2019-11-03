import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';

export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="id" />
            <EditButton/>
        </Datagrid>
    </List>
);