import { TransactionalEmailsApi, SendSmtpEmail } from "sib-api-v3-typescript";

const sendEmail = ({
  username,
  model,
  value,
  tranNo,
  image,
  email,
  tradeInDate,
}) => {
  let apiInstance = new TransactionalEmailsApi();

  let apiKey = apiInstance.authentications["apiKey"];
  apiKey.apiKey =
    "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";

  let sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.subject = "{{params.subject}}";
  sendSmtpEmail.htmlContent = `<html><body>
    <div
      class="Container"
      style="width: 804px; margin: auto; font-family: 'Arial'; padding: 43px"
    >
      <header
        style="
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 400px;
          margin: auto;
          font-size: 18px;
          line-height: 27px;
          font-weight: 600;
          margin-bottom: 62px;
        "
      >
        {{params.model}}
      </header>
      <div
        class="name"
        style="
          font-size: 18px;
          line-height: 27px;
          font-weight: 600;
          margin-bottom: 12px;
        "
      >
        Hi {{params.name}}!
      </div>
      <div
        class="body-text"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 22px;
          letter-spacing: -0.02em;
          color: #4f4f4f;
          margin-bottom: 25px;
        "
      >
        Click the button below to complete your trade-in request and confirm
        your estimated trade quote. Once confirmed, you will receive your
        shipping kit.
      </div>
      <div
        class="trade-in-header-text"
        style="
          font-style: normal;
          font-weight: 600;
          font-size: 15px;
          line-height: 22px;
          margin-bottom: 12px;
        "
      >
        Trade-In details
      </div>
      <div
        class="trade-in-details"
        style="display: flex; align-items: center; margin-bottom: 12px"
      >
        <img
          class="image-catalog"
          src="{{params.image}}"
          style="width: auto; height: auto; margin-right: 17px"
        />
        <div
          class="model-details"
          style="
            width: 112px;
            height: 70px;
            font-style: normal;
            font-size: 14px;
            line-height: 21px;
            color: #4f4f4f;
          "
        >
          <b style="color: black">Model:</b>
          {{params.model}}
        </div>
        <div
          class="estimate-value"
          style="
            width: 112px;
            height: 70px;
            font-style: normal;
            font-size: 14px;
            line-height: 21px;
            color: #828282;
            margin-left: 371px;
          "
        >
          Estimated value
          <b
            class="value"
            style="
              font-style: normal;
              font-weight: 600;
              font-size: 22px;
              line-height: 33px;
              color: #333333;
            "
            >$ {{params.value}}<span style="font-size: 12px">USD</span></b
          >
        </div>
      </div>
      <div
        class="divider"
        style="
          width: 721px;
          height: 1px;
          background-color: #e0e0e0;
          margin-bottom: 21px;
        "
      ></div>
      <div
        class="transaction-text"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 30px;
        "
      >
        Transaction No: <b>{{params.tranNo}}</b>
      </div>
      <div
        class="transaction-text"
        style="
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 30px;
        "
      >
        Transaction Date: <b>{{params.date}}</b>
      </div>
      <a
      style="text-decoration: none;"
        href="${window.location.origin}/#/transactionsuccess"
        target="_blank"
      >
      <div style="
          width: 206px;
          padding: 14px 0px;
          border-radius: 4px;
          border: none;
          background-color: #fd0000;
          text-align: center;
          color: #ffffff;
          font-family: 'Arial';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 21px;
          margin: 21px 0 33px 0;
          cursor: pointer;
        ">
        Verify your transaction
      </div>
      </a>
      <div
        style="
          color: #4f4f4f;
          font-size: 15px;
          line-height: 22px;
          margin-bottom: 21px;
        "
      >
        Thank you for starting your trade-in process with PCS Wireless, Apple’s
        trade-in partner. Our goal is to make your device trade-in process as
        simple and safe as possible.
      </div>
      <div style="color: #4f4f4f; font-size: 15px; line-height: 22px">
        Questions?<br />
        You may email us at
        <span style="color: #fd0000; font-weight: 600"
          ><a href="mailto:support@pcstradein.com"
            >support@pcstradein.com</a
          ></span
        >
        or contact us thru this number +657 908 908
      </div>
      <footer>
        <a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a>
      </footer>
    </div>
  </body></html>`;
  sendSmtpEmail.sender = {
    name: "Keith Modina",
    email: "keith.modina@gmail.com",
  };
  sendSmtpEmail.to = [{ email: email, name: username }];
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = {
    name: username,
    model: model,
    value: value,
    tranNo: tranNo,
    date: tradeInDate,
    image: image,
    subject: "GAMESTOP TRADE-IN",
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {},
    function (error) {
      console.error(error);
    }
  );
};

export default sendEmail;
