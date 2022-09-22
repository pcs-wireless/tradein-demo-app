import { FC, useEffect, useState } from "react";
import { Select, Spin } from "antd";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GET_MODELS_CARRIERS } from "../services/query";
import { selectCarrier } from "../components/itemSlice";
import { mq } from "../assets/mediaQueries";
import { useQuery } from "@apollo/client";
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

const CarrierSelectBox: FC = () => {
  const dispatch = useAppDispatch();
  const { carrier, manufacturer } = useAppSelector((state) => state.item);
  const { loading, data } = useQuery(GET_MODELS_CARRIERS, {
    notifyOnNetworkStatusChange: true,
  });

  const [isNull, setIsNull] = useState<boolean>(false);

  const handleChange = (name: any, option: any) => {
    setIsNull(false);
    dispatch(selectCarrier({ name, id: option.key }));
  };

  useEffect(() => {
    if (carrier === null) document.getElementById("carrier-not-null")?.click();
  }, [manufacturer, carrier]);

  return !isNull ? (
    <>
      <button id="carrier-not-null" onClick={() => setIsNull(true)} hidden />
      <CustomSelect
        showSearch
        placeholder={<FormattedMessage id="SELECT_CARRIER" />}
        optionFilterProp="children"
        defaultValue={carrier}
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
            .localeCompare(
              (optionB!.children as unknown as string).toLowerCase()
            )
        }
      >
        {data && !loading
          ? data.carriers.map((item: { id: number; name: string }) => {
              return (
                <Option key={item.id} value={item.name}>
                  {item.name}
                </Option>
              );
            })
          : ""}
      </CustomSelect>
    </>
  ) : (
    <>
      <CustomSelect
        showSearch
        placeholder={<FormattedMessage id="SELECT_CARRIER" />}
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
            .localeCompare(
              (optionB!.children as unknown as string).toLowerCase()
            )
        }
      >
        {data && !loading
          ? data.carriers.map((item: { id: number; name: string }) => {
              return (
                <Option key={item.id} value={item.name}>
                  {item.name}
                </Option>
              );
            })
          : ""}
      </CustomSelect>
    </>
  );
};

export default CarrierSelectBox;
