import { FC } from "react";
import { Select, Spin } from "antd";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GET_MODELS_COLORS } from "../services/query";
import { useQuery } from "@apollo/client";
import { selectColor } from "../components/itemSlice";
import { mq } from "../assets/mediaQueries";
import { FormattedMessage } from "react-intl";

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

const ColorSelectBox: FC = () => {
  const dispatch = useAppDispatch();
  const { color } = useAppSelector((state) => state.item);
  const { loading, data } = useQuery(GET_MODELS_COLORS, {
    notifyOnNetworkStatusChange: true,
  });
  const handleChange = (name: any, option: any) => {
    dispatch(selectColor({ name, id: option.key }));
  };

  return color ? (
    <CustomSelect
      showSearch
      placeholder={<FormattedMessage id="SELECT_COLOR" />}
      optionFilterProp="children"
      defaultValue={color}
      onChange={handleChange}
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
      {data && !loading
        ? data.colors?.map((item: { id: number; name: string }) => {
            return (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            );
          })
        : ""}
    </CustomSelect>
  ) : (
    <CustomSelect
      showSearch
      placeholder={<FormattedMessage id="SELECT_COLOR" />}
      optionFilterProp="children"
      onChange={handleChange}
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
      {data && !loading
        ? data.colors?.map((item: { id: number; name: string }) => {
            return (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            );
          })
        : ""}
    </CustomSelect>
  );
};

export default ColorSelectBox;
