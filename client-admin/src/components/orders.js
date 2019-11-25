import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, ReferenceField,ReferenceInput,
    TextField, EditButton, NumberInput, minValue, SelectInput,
    TextInput, DisabledInput, Filter, ArrayField } from 'react-admin';

    const choices = [
        { status: 'Confirmed'},
        { status: 'Shipping' },
        { status: 'Delivered' },
        { status: 'Canceled'}
    ];

    const OrderFilter = (props) => (
        <Filter {...props}>
              <ReferenceInput  label="Họ và tên" reference="customer" source="userId" alwaysOn>
                <SelectInput optionText="fullName" />
            </ReferenceInput>
        </Filter>
    );

export const OrderList = (props) => (
    <List title="Quản lý đơn hàng" {...props} filters={<OrderFilter/>} >
        <Datagrid>
            <TextField source="id" />
            <TextField label="Ngày tạo" source="createdAt" />
            <ReferenceField  label="Khách hàng" reference="customer" source="userId">
                <TextField source="email" />
            </ReferenceField>
            <TextField label="Tổng giá" source="subtotal.grandTotal" />
            <TextField label="Trạng thái" source="status" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const OrderEdit = (props) => (
    <Edit title="Thông tin chi tiết" {...props}>
        <SimpleForm>
            <TextField source="id" />
            <TextField label="Ngày tạo" source="createdAt" />
            <TextField label="Ngày update" source="updatedAt" />
            <TextField label="Người nhận hàng" source="fullName" />
            <TextField  label="Số điện thoại" source="phone" />
            <ReferenceField  label="Email" reference="customer" source="userId">
                <TextField source="email" />
            </ReferenceField>
            <TextField label="Tổng giá" source="subtotal.grandTotal" />
            <TextField label="Phương thức thanh toán" source="paymentMethod" />
            <TextField label="Số nhà" source="addressShip.details" />
            <TextField label="Đường" source="addressShip.ward" />
            <TextField label="Quận" source="addressShip.district" />
            <TextField label="Thành phố" source="addressShip.province" />
            <TextField label="Ngày cập nhật" source="updatedAt" />
            <ArrayField label="Danh sách sản phẩm" source="bookList">
                <Datagrid>
                <ReferenceField  label="UID sách" reference="Books" source="bookId">
                  <TextField source="uid" />
                </ReferenceField>
                <TextField label="Tiêu đề" source="title" />
                <TextField label="Số lượng" source="quantity" />
                <TextField label="Giá" source="price" />
               </Datagrid>
           </ArrayField>
            <SelectInput label="Trạng thái" source="status" choices={choices} optionText="status" optionValue="status" />
        </SimpleForm>
    </Edit>
);
// export const OrderCreate = (props) => (
//     <Create {...props}>
//         <SimpleForm>
//         <TextInput source="id" />
//             <TextInput source="createdAt" />
//             <TextInput source="userId" />
//             <TextInput source="status" />
//         </SimpleForm>
//     </Create>
// );
