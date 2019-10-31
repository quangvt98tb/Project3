import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';

export const OrderList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="uid" />
            <TextField source="userId" />
            <TextField source="bookId" />
            <TextField source="quantity" />
            <TextField source="price" />
            <TextField source="total" />
            <TextField source="promotionId" />
            <TextField source="createdAt" />
            <TextField source="paymentMethod" />
            <TextField source="addressShip" />
            <TextField source="status" />

            <EditButton/>
        </Datagrid>
    </List>
);

export const OrderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="uid" />
            <DisabledInput source="userId" />
            <DisabledInput source="bookId" />
            <TextInput source="quantity" />
            <TextInput source="price" />
            <TextInput source="total" />
            <TextInput source="promotionId" />
            <TextInput source="createdAt" />
            <TextInput source="paymentMethod" />
            <TextInput source="addressShip" />
            <TextInput source="status" />
        </SimpleForm>
    </Edit>
);
export const OrderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
        <TextInput source="userId" />
        <TextInput source="bookId" />
        <TextInput source="quantity" />
        <TextInput source="price" />
        <TextInput source="total" />
        <TextInput source="promotionId" />
        <TextInput source="createdAt" />
        <TextInput source="paymentMethod" />
        <TextInput source="addressShip" />
        <TextInput source="status" />
        </SimpleForm>
    </Create>
);
