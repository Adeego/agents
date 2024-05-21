import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Bell, PartyPopper } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// notifications types;

// new client registration;
// Earnings summary;
// new order client notif;
// milestone achivements;
// Promotional

const Notificationtype = () => {
  return (
    <div className="flex p-4 justify-between border-t">
      <div className="w-16">
        <div className="size-10 flex items-center justify-center rounded-[0.3rem] ">
          <PartyPopper size={18} />
        </div>
      </div>
      <div className=" w-full flex flex-col gap-1">
        <p className="text-sm">
          <b>Congratulations! </b> A new client has registered using your
          referral code.
        </p>
        <p className="text-xs text-neutral-500">3D ago</p>
      </div>
      <div className="col-span-1 flex flex-col justify-center w-4 shrink-0">
        <div className="size-[6px] bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

const NotificationsMobile = () => {
  return (
    <div className="!md:hidden">
      <Drawer>
        <DrawerTrigger className="size-10 text-neutral-700 hover:text-black grid place-items-center border border-neutral-200 rounded-full relative">
          <Bell size={18} />
          <div className="absolute top-0 right-0 size-[10px] bg-blue-400 rounded-full" />
        </DrawerTrigger>
        <DrawerContent className="bg-white rounded-t-[0.7rem">
          <DrawerHeader className=''>
            <DrawerTitle className="text-left">Notifications</DrawerTitle>
          </DrawerHeader>

          <ScrollArea className="flex flex-col max-h-[80vh] pt-4">
            {[...Array(20)].map((_, i) => (
              <Notificationtype key={i} />
            ))}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const Notifications = () => {
  return (
    <>
      <NotificationsMobile />
    </>
  );
};

export default Notifications;
