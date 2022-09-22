import styled from "@emotion/styled";
import { Checkbox } from "antd";
import { mq } from "../assets/mediaQueries";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setQuestion1,
  setQuestion2,
  setQuestion3,
  setQuestion4,
  setQuestion5,
  setQuestion6,
  setQuestion7,
  setGrade1,
  setGrade2,
  setGrade3,
  setGrade4,
  setGrade5,
  setGrade6,
  setGrade7,
} from "../components/itemSlice";
import { GET_PARTNER_GRADE_ID } from "../services/query";
import { useQuery } from "@apollo/client";

const CustomCheckbox = styled(Checkbox)(
  mq({
    borderRadius: "50%",
    span: {
      color: ["auto", "transparent"],
    },
  })
);

interface ICheckboxComponent {
  index: any;
  partnerId: string;
  partnerName: string;
  value: string;
  deviceConditionId: number;
  deviceConditionGradeId: string;
}
const CheckboxComponent = ({
  index,
  partnerId,
  partnerName,
  value,
  deviceConditionId,
  deviceConditionGradeId,
}: ICheckboxComponent) => {
  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
  } = useAppSelector((state) => state.item.deviceCondition);
  const { loading, data } = useQuery(GET_PARTNER_GRADE_ID, {
    variables: {
      questionnaireId: deviceConditionId,
      yesOrNo: deviceConditionGradeId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const dispatch = useAppDispatch();

  if (loading) return <div></div>;
  switch (index) {
    case "0-0":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion1(true));
              dispatch(
                setGrade1({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question1 ? true : false}
        >
          {value}
        </CustomCheckbox>
      );
    case "1-0":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion1(false));
              dispatch(
                setGrade1({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question1 === undefined ? false : !question1}
        >
          {value}
        </CustomCheckbox>
      );
    case "0-1":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion2(true));
              dispatch(
                setGrade2({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question2 ? true : false}
        >
          {value}
        </CustomCheckbox>
      );
    case "1-1":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion2(false));
              dispatch(
                setGrade2({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question2 === undefined ? false : !question2}
        >
          {value}
        </CustomCheckbox>
      );
    case "0-2":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion3(true));
              dispatch(
                setGrade3({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question3 ? true : false}
        >
          {value}
        </CustomCheckbox>
      );
    case "1-2":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion3(false));
              dispatch(
                setGrade3({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question3 === undefined ? false : !question3}
        >
          {value}
        </CustomCheckbox>
      );
    case "0-3":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion4(true));
              dispatch(
                setGrade4({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question4 ? true : false}
        >
          {value}
        </CustomCheckbox>
      );
    case "1-3":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion4(false));
              dispatch(
                setGrade4({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question4 === undefined ? false : !question4}
        >
          {value}
        </CustomCheckbox>
      );
    case "0-4":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion5(true));
              dispatch(
                setGrade5({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question5 ? true : false}
        >
          {value}
        </CustomCheckbox>
      );
    case "1-4":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion5(false));
              dispatch(
                setGrade5({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question5 === undefined ? false : !question5}
        >
          {value}
        </CustomCheckbox>
      );
    case "0-5":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion6(true));
              dispatch(
                setGrade6({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question6 ? true : false}
        >
          {value}
        </CustomCheckbox>
      );
    case "1-5":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion6(false));
              dispatch(
                setGrade6({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question6 === undefined ? false : !question6}
        >
          {value}
        </CustomCheckbox>
      );
    case "0-6":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion7(true));
              dispatch(
                setGrade7({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question7 ? true : false}
        >
          {value}
        </CustomCheckbox>
      );
    case "1-6":
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(setQuestion7(false));
              dispatch(
                setGrade7({
                  name: deviceConditionGradeId,
                  deviceConditionId,
                  deviceConditionGradeId,
                  partnerGradeId: data?.deviceConditions[0]?.partnerGrade?.id,
                })
              );
            }
          }}
          checked={question7 === undefined ? false : !question7}
        >
          {value}
        </CustomCheckbox>
      );
    default:
      return (
        <CustomCheckbox
          key={partnerId}
          value={partnerName}
          onChange={(e) => console.log(e)}
          checked={question5 ? true : false}
        >
          {value}
        </CustomCheckbox>
      );
  }
};

export default CheckboxComponent;
