import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, ReferenceField,ReferenceInput,
    TextField, EditButton, NumberInput, minValue,SelectInput,
    TextInput } from 'react-admin';

export const OrderList = (props) => (
    <List {...props}>
        <Datagrid>
            {/* <ReferenceField  label="User" reference="customer" source="userId">
                <TextField source="fullName" />
            </ReferenceField> */}
            <ReferenceField  label="Book" reference="Books" source="bookId">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="quantity" />
            <TextField source="price" />
            <TextField source="total" />
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
            <ReferenceField  label="Book" reference="Books" source="bookId">
                <TextField source="name" />
            </ReferenceField>
            <NumberInput source="quantity"  />
            <NumberInput source="price" />
            <NumberInput source="total" />
            {/* <TextInput source="promotionId" /> */}
            <TextInput source="paymentMethod" />
            <TextInput source="addressShip" />
            <TextInput source="status" />
        </SimpleForm>
    </Edit>
);
export const OrderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput  label="Book" reference="Books" source="bookId">
                <SelectInput optionText="name" />
            </ReferenceInput>   
            <NumberInput source="quantity" validate={minValue(0)} />
            <NumberInput source="price" validate={minValue(0)} />
            <NumberInput source="total" />
            <TextInput source="paymentMethod" />
            <TextInput source="addressShip" />
            <TextInput source="status" />
        </SimpleForm>
    </Create>
);
