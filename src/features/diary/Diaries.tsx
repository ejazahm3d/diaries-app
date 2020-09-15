import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import http from "../../services/api";
import { Diary } from "../../interfaces/diary.interface";
import { addDiary } from "./diariesSlice";
import Swal from "sweetalert2";
import { setUser } from "../auth/userSlice";
import DiaryTile from "./DiaryTile";
import { User } from "../../interfaces/user.interface";
import { useAppDispatch } from "../../store";
import dayjs from "dayjs";

const Diaries: FC = () => {
  const dispatch = useAppDispatch();
  const diaries = useSelector((state: RootState) => state.diaries);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        http.get<null, Diary[]>(`users/${user.id}/diaries`).then((data) => {
          if (data && data.length > 0) {
            console.log(data);
            const sortedByUpdatedAt = data.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(addDiary(sortedByUpdatedAt));
          }
        });
      }
    };
    fetchDiaries();
  }, [dispatch, user]);

  const createDiary = async () => {
    const result = await Swal.mixin({
      input: "text",
      confirmButtonText: "Next →",
      showCancelButton: true,
      progressSteps: ["1", "2"],
    }).queue([
      {
        titleText: "Diary title",
        input: "text",
      },
      {
        titleText: "Private or public diary?",
        input: "radio",
        inputOptions: {
          private: "Private",
          public: "Public",
        },
        inputValue: "private",
      },
    ]);
    if ((result as any).value) {
      const { value } = result as any;
      const { diary, user: _user } = await http.post<
        Partial<Diary>,
        { diary: Diary; user: User }
      >(`users/${user.id}/diaries/`, {
        title: value[0],
        type: value[1],
        userId: user?.id,
      });
      if (diary && user) {
        dispatch(addDiary([diary] as Diary[]));
        dispatch(addDiary([diary] as Diary[]));
        dispatch(setUser(_user));
        return Swal.fire({
          titleText: "All done!",
          confirmButtonText: "OK!",
        });
      }
    }
    Swal.fire({
      titleText: "Cancelled",
    });
  };

  return (
    <div style={{ padding: "1em 0.4em" }}>
      <button onClick={createDiary}>Create New</button>
      {diaries.map((diary, idx) => (
        <DiaryTile key={idx} diary={diary} />
      ))}
    </div>
  );
};

export default Diaries;
