"use client";
import { FC } from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { JobPost } from "@/providers/types/definition";
import { useParams } from "next/navigation";
import { useOne } from "@/hooks/useDataProvider";

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: JobPost;
}

const ApplyJobModal: FC<ApplyJobModalProps> = ({ isOpen, onClose, job }) => {
  const { slug } = useParams();
  const { data } = useOne({
    resource: "Jobs",
    id: slug as string,
    meta: { join: ["Organization"] },
  });
  const job1 = data?.data;
  console.log(job1);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content
        maxWidth={"1200px"}
        width={{ lg: "1000px", xl: "1000px", initial: "1000px", xs: "1000px" }}
      >
        <Dialog.Title>
          <>
            <Text
              className="text-gray-500"
              as="div"
              size="1"
              mb="1"
              weight="bold"
            >
              BẠN ĐANG ỨNG TUYỂN CHO CÔNG VIỆC
            </Text>
            <Text as="div" size="3" mb="1" weight="bold">
              <span className="text-red-900">{job1?.title}</span>{" "}
              <span>{job1?.organization?.name}</span>
            </Text>
          </>
        </Dialog.Title>
        <Flex gapX={"8"}>
          <Text as="div" size="2" mb="1" weight="bold" color="gray">
            Thông tin cơ bản
          </Text>
          <Flex gap="3" width={"100%"}>
            <label className="flex-1">
              <Text as="div" size="3" mb="1" weight="bold">
                Học vấn
              </Text>
              <TextField.Root placeholder="Enter your full name" size="3" />
            </label>
            <label className="flex-1">
              <Text as="div" size="3" mb="1" weight="bold">
                Kinh nghiệm
              </Text>
              <TextField.Root placeholder="Enter your email" size="3" />
            </label>
          </Flex>
          <Flex gap="3" width={"100%"}>
            <label className="flex-1">
              <Text as="div" size="3" mb="1" weight="bold">
                Học vấn
              </Text>
              <TextField.Root placeholder="Enter your full name" size="3" />
            </label>
            <label className="flex-1">
              <Text as="div" size="3" mb="1" weight="bold">
                Kinh nghiệm
              </Text>
              <TextField.Root placeholder="Enter your email" size="3" />
            </label>
            <label className="flex-1">
              <Text as="div" size="3" mb="1" weight="bold">
                Kinh nghiệm
              </Text>
              <TextField.Root placeholder="Enter your email" size="3" />
            </label>
          </Flex>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={() => onClose()}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ApplyJobModal;
