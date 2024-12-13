import { AttendanceRecord, UserInfo } from "@/types/type";


export async function saveUserInfo(userId: string, userInfo: UserInfo): Promise<void> {
     
    if (!userId || !userInfo) {
        throw new Error("userId and userInfo are required");
    }

    try{

        console.log("Saving member info:", userInfo);
        
        await fetch(`/api/members?userId=${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
            next: { revalidate: 100 },
          },
        );
          

    }
    catch(e){
        console.error("Error saving member info:", e);
        throw e;
    }   

}

export async function getQRCode(userId: string): Promise<string | null> {
    if (!userId) throw new Error("userID is required");

    try {
        const response = await fetch(`/api/members?userId=${userId}`, { method: "GET", headers: { "Content-Type": "application/json"},
            next: { revalidate: 100 },
        });
        if (!response.ok) {
            throw new Error("Error fetching QR code");
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error fetching QR code:", e);
        throw e;
    }
}

export async function updateQRCode(userId: string, qrContent: string): Promise<void> {
    if (!userId || !qrContent) {
        throw new Error("userId and qrContent are required");
    }

    console.log("Saving QR code:", qrContent);
    try {
        await fetch(`/api/members?userId=${userId}`, { method: "PUT", body: JSON.stringify({ qrCode: qrContent }) , headers: { "Content-Type": "application/json" } });
    } catch (e) {
        console.error("Error saving QR code:", e);
        throw e;
    }
}

// export async function updateUserInfo(userId: string, userInfo: UserInfo): Promise<void> {
//     if (!userId || !userInfo) {
//         throw new Error("userId and userInfo are required");
//     }

//     try {
//         console.log("Saving member info:", userInfo);
//         await fetch(`/api/members?userId=${userId}`, { method: "PUT", body: JSON.stringify(userInfo), headers: { "Content-Type": "application/json" },});

//     } catch (e) {
//         console.error("Error saving member info:", e);
//         throw e;
//     }
// }
export async function updateUserInfo(userId: string, userInfo: FormData) {
    try {

        console.log("Saving member info:", userInfo.get('profilePic'));

      const response = await fetch(`/api/members?userId=${userId}`, {
        method: 'PUT',
        body: userInfo, 
      });
  
      if (!response.ok) {
        throw new Error(`Error updating user info: ${response.status} - ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  }



  export async function deleteUser(userId:string){
    if (!userId) throw new Error("userID is required");
    try{
        const response = await fetch(`/api/user?userId=${userId}`, { method: "DELETE", headers: { "Content-Type": "application/json" },    });
        if (!response.ok) {
            throw new Error("Error deleting user");
        }
        return response;
    }
    catch(e){
        console.error("Error deleting user:", e);
        throw e;
    }

  }


export async function getAttendanceHistory(userId: string): Promise<AttendanceRecord[]> {
    if (!userId) throw new Error("userID is required");

    try {
        const response = await fetch(`/api/attendance?userId=${userId}`, { method: "GET", headers: { "Content-Type": "application/json" },    });
        if (!response.ok) {
            throw new Error("Error fetching attendance history");
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error fetching attendance history:", e);
        throw e;
    }
}

export async function MarkAttendance(userId:string, date:Date){
    if (!userId) throw new Error("userID is required");
    try{
        const response = await fetch(`/api/attendance/mark?userId=${userId}&date=${date}`)
        
        if (!response.ok) {
            throw new Error("Error creating attendance");
        }
      
         
    }
    catch(e){
        console.log('error  creating attendance')
        throw e
    }

}


export async function getMemberInfo(userId: string): Promise<UserInfo | null> {
    if (!userId) throw new Error("userID is required");

    try {
        const response = await fetch(`/api/user?userId=${userId}`, { method: "GET", headers: { "Content-Type": "application/json" },    next: { revalidate: 100 }, });
        if (!response.ok) {
            throw new Error("Error fetching user info");
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error fetching user info:", e);
        throw e;
    }
}


export async function GetMembers(){
  try{
 const response  = await fetch('/api/users',
    {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 100 },
    })
    if (!response) {
        throw new Error("Error fetching user info");
    }
    const data = await response.json();
    return data;


  }
  catch(e){
    console.error("Error fetching user info:", e);
    throw e;

  }

}