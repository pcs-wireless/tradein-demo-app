import { FC } from "react";
import { Select, Spin } from "antd";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GET_DEVICE_MANUFACTURERS } from "../services/query";
import { useQuery } from "@apollo/client";
import {
  selectManufacturer,
  resetQuotationDetails,
} from "../components/itemSlice";
import { mq } from "../assets/mediaQueries";
import { FormattedMessage } from "react-intl";
import { getPartnerId } from "../utils";

const { Option } = Select;

const CustomSelect = styled(Select)(
  mq({
    width: ["100%", 598],
    height: 45,
    ".ant-select-selector": {
      height: "45px !important",
      display: "flex",
      alignItems: "center",
    },
    ".ant-select-selection-search-input": {
      height: "45px !important",
    },
  })
);

const ManufacturerSelectBox: FC = () => {
  const dispatch = useAppDispatch();
  const { manufacturer } = useAppSelector((state) => state.item);
  const { deviceId } = useAppSelector((state) => state.item.ids);
  const { loading, data } = useQuery(GET_DEVICE_MANUFACTURERS, {
    variables: { partnerId: getPartnerId(), deviceId: deviceId },
    notifyOnNetworkStatusChange: true,
  });

  const handleManufacturersChange = (name: any, option: any) => {
    if (manufacturer && manufacturer !== name) {
      dispatch(resetQuotationDetails());
    }
    dispatch(selectManufacturer({ name, id: option.key }));
  };

  return manufacturer ? (
    <CustomSelect
      showSearch
      placeholder={<FormattedMessage id="SELECT_MANUFATURER" />}
      optionFilterProp="children"
      defaultValue={manufacturer}
      onChange={handleManufacturersChange}
      notFoundContent={loading ? <Spin size="small" /> : null}
      filterOption={(input: string, option: any) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      filterSort={(optionA: any, optionB: any) =>
        (optionA!.children as unknown as string)
          .toLowerCase()
          .localeCompare((optionB!.children as unknown as string).toLowerCase())
      }
    >
      {!loading &&
        data?.manufacturers?.map((item: { id: number; name: string }) => {
          return (
            <Option key={item.id} value={item.name}>
              {item.name}
            </Option>
          );
        })}
    </CustomSelect>
  ) : (
    <CustomSelect
      showSearch
      placeholder={<FormattedMessage id="SELECT_MANUFATURER" />}
      optionFilterProp="children"
      onChange={handleManufacturersChange}
      notFoundContent={loading ? <Spin size="small" /> : null}
      filterOption={(input: string, option: any) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      filterSort={(optionA: any, optionB: any) =>
        (optionA!.children as unknown as string)
          .toLowerCase()
          .localeCompare((optionB!.children as unknown as string).toLowerCase())
      }
    >
      {!loading &&
        data?.manufacturers?.map((item: { id: number; name: string }) => {
          return (
            <Option key={item.id} value={item.name}>
              {item.name}
            </Option>
          );
        })}
    </CustomSelect>
  );
};

export default ManufacturerSelectBox;
