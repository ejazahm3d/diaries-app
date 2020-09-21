import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import http from "../../services/api";
import { Entry } from "../../interfaces/entry.interface";
import { setEntries } from "../entry/entriesSlice";
import { setCurrentlyEditing, setCanEdit } from "../entry/editorSlice";
import dayjs from "dayjs";
import { useAppDispatch } from "../../store";
import { useRouter } from "next/router";
import Link from "next/link";

const DiaryEntriesList: FC = () => {
  const { entries, user } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);
  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: Entry[] }>(
          `users/${user.id}/diaries/${id}/entries`
        )
        .then((data) => {
          const { entries: _entries } = data;
          if (_entries) {
            const sortByLastUpdated = _entries?.sort?.((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            console.log(sortByLastUpdated);
            dispatch(setEntries(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <div className="entries">
      <header>
        <Link href="/">
          <a>
            <h3>← Go Back</h3>
          </a>
        </Link>
      </header>
      <ul>
        {entries.map((entry) => (
          <li
            key={entry.id}
            onClick={() => {
              dispatch(setCurrentlyEditing(entry));
              dispatch(setCanEdit(true));
            }}
          >
            {entry.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryEntriesList;
