import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { finalize, map, Observable, Subscription } from 'rxjs';
import { SharedEmotionInterface } from '@interfaces/general.interface';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseEmotionsGetInterface } from '@interfaces/response/Response.interface';
import { SharedEmotionsPeriod } from '@enums/SharedEmotionsPeriod';
import {
  getSharedEmotionsRange,
  SharedEmotionsRange
} from '@functions/getSharedEmotionsStats';

export interface SharedEmotionsData {
  key: string;
  period: SharedEmotionsPeriod;
  offset: number;
  range: SharedEmotionsRange;
  emotions: SharedEmotionInterface[];
}

const getRangeKey = ({ start, end }: SharedEmotionsRange): string =>
  `${start.unix()}-${end.unix()}`;

export const useSharedEmotions = (
  period: SharedEmotionsPeriod,
  offset: number
): {
  data: SharedEmotionsData | null;
  range: SharedEmotionsRange;
  loading: boolean;
  loadEmotions: (onDone?: () => void) => void;
} => {
  const range = useMemo(
    () => getSharedEmotionsRange(period, offset),
    [period, offset]
  );
  const key = getRangeKey(range);

  // Shown data stays until the next range arrives, so switching doesn't flash
  const [data, setData] = useState<SharedEmotionsData | null>(null);

  const cache = useRef(new Map<string, SharedEmotionsData>());
  const subscription = useRef<Subscription>(null);
  const initialPeriod = useRef<SharedEmotionsPeriod>(period);

  const request = useCallback(
    (
      requestPeriod: SharedEmotionsPeriod,
      requestOffset: number,
      requestRange: SharedEmotionsRange
    ): Observable<SharedEmotionsData> =>
      getRequest<ResponseEmotionsGetInterface>(
        `emotions?from=${requestRange.start.unix()}&to=${requestRange.end.unix()}`
      ).pipe(
        map((response: ResponseEmotionsGetInterface) => {
          const result = {
            key: getRangeKey(requestRange),
            period: requestPeriod,
            offset: requestOffset,
            range: requestRange,
            emotions: response?.data ?? []
          };
          // Failed requests aren't cached so the range is retried next time
          if (response) {
            cache.current.set(result.key, result);
          }
          return result;
        })
      ),
    []
  );

  const loadEmotions = useCallback(
    (onDone?: () => void) => {
      // Drop an in-flight request so a slow response can't overwrite a newer range
      subscription.current?.unsubscribe();

      // finalize also runs when the request is dropped, so onDone always fires
      subscription.current = request(period, offset, range)
        .pipe(finalize(() => onDone?.()))
        .subscribe(setData);
    },
    [period, offset, range, request]
  );

  useEffect(() => {
    const cached = cache.current.get(key);
    if (cached) {
      setData(cached);
    } else {
      loadEmotions();
    }

    return () => subscription.current?.unsubscribe();
  }, [key, loadEmotions]);

  // Warm up the other current periods so the first tab switches are instant
  useEffect(() => {
    const prefetches = Object.values(SharedEmotionsPeriod)
      .filter((value: SharedEmotionsPeriod) => value !== initialPeriod.current)
      .map((value: SharedEmotionsPeriod) =>
        request(value, 0, getSharedEmotionsRange(value, 0)).subscribe()
      );

    return () => prefetches.forEach((item: Subscription) => item.unsubscribe());
  }, [request]);

  // Cached ranges are shown in the same render, without a dimmed frame
  const shown = cache.current.get(key) ?? data;

  return { data: shown, range, loading: shown?.key !== key, loadEmotions };
};
