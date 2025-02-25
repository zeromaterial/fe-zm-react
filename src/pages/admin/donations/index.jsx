import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { DataLoading, DataError } from "../../../components/Section/DataStatus";
import { formatPageName, formatThousandNumber } from "../../../_formats";
import { getDonations } from "../../../_services/donation";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export function Donations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const getData = await getDonations();
      setDatas(getData);
    } catch (err) {
      setError("Failed to fetch data, please try again later.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <DataLoading />;
  }

  if (error) {
    return <DataError msg={error} />;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="capitalize mb-8 p-6"
        >
          <Link to={`create`}>
            <Button color="teal" className="rounded-md">
              Save Data
            </Button>
          </Link>
        </CardHeader>
        <CardBody className="overflow-x-scroll overflow-hidden px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "campaign",
                  "user",
                  "payment_method",
                  "donation_type",
                  "amount",
                  "status",
                  "action",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datas.map(
                (
                  {
                    id,
                    campaign,
                    user,
                    payment_method,
                    donation_type,
                    amount,
                    status,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === datas.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="capitalize font-semibold"
                        >
                          {campaign.title}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {payment_method.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {donation_type.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {formatThousandNumber(amount, "IND")}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {status}
                        </Typography>
                      </td>
                      <td className={`${className} flex flex-row gap-2`}>
                        <Link to={`edit/${id}`}>
                          <PencilSquareIcon {...icon} />
                        </Link>
                        <Link>
                          <TrashIcon {...icon} />
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
