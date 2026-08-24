import { createFileRoute } from "@tanstack/react-router";
import weInsureLogo from "@/assets/we-insure-logo.svg";
import { QuoteDialog } from "@/components/QuoteDialog";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pablo Taquechel — Miami Insurance Agent | We Insure Miami" },
      {
        name: "description",
        content:
          "Home, auto, flood and business insurance in Miami. 15+ years of personal, trusted service from Pablo Taquechel and the We Insure Miami team.",
      },
    ],
  }),
  component: Index,
});

const PHONE = "(305) 259-1910";
const PHONE_HREF = "tel:+13052591910";
const EMAIL = "pablo.taquechel@weinsuregroup.com";
const HERO_IMAGE =
  "https://images-listings.century21.com/FL_FKBOR/61/82/78/_P/618278_P00.jpg?format=webp&quality=85&width=1800";
const PABLO_IMAGE =
  "data:image/jpeg;base64,31FdMeDeMxmJVd6oyQAzZk2jyrS8U4YaIWIYEvJFqACnr/51obphiicjejdx6V9ZaP2JbRznUHT/cb9Ungv6zgEGANnxMB5bZB5iQ7afzz3INFbq27MvrBqLE/CyWI9A9+7uQU5KnC11zFYCy7smYOk80x9FBC+pB3TVtDWoQGQcMenhPuxtY0JK61/UoA0aBa+O3dg+1sWKelxmw0CPhK7ZDZe+dwZKHBoDjMQbHJfBcNUFrYdgp8zAtWM3rtAGVdQO/WBbDu8QuXco6/84HQCymIVJwkNaYVuz3Ihe1ZDarWXrClQD2uCDaYKtS2ODS+lGzpXEvgXFCw4zFqDmAa8Sj66l5jqOLddGql4gNUU9rl2h4ZdszoRbT/cFOMFMXpssb9I66uT3dQnFyK9BxiWy8dmO0XDCu6vQmoDoFK81AZ0CsD13GGwHGSB24lGmljkYoHDY/QmGUIll31e+Yl0JVAfVjkUQAZxMOyDsmsgGOSCNL2r/wA0xQoX2L1HECw8ViVZcRXCcFRY0X0Dy7nFJw/3iKlAOA292ZZRPkf7mAbRlTiGIqjAXwxrCsGGUvqz0Jp/cWIpdpWSUxKFtDk4Y9qzL7kQJVXVygFTYvgiz5lXvpBO7W3WD7ZgA3UOL1AOjOVW3v2lwFB0WfV17QQwXm3IRsJwkb9IM0WZyPiVqGCqoDyyiEBGBX1+JbMTopaUyicjHSGgEDHAL9YWiXaKPshEDbR3/wCWt8MOYenilRZzC7qz943QWBQAF4iHmFCkjxwMZFB1Zl8QXhK/PaW1fd09YAKKDsmTOGXiBCb46QRxiBGPKNe3xuN0R6sU0bdG/WA4MPnEWpNveyD7rO67RSDh7oJKbCtYIOFy5usMAhh4p9ZcUv0mXxEvF50n2iMWnLVZGKB8GvYnLEK2HdGZB1Z15hcY0w6viKmEM5U90NiLK5X2nKkUup/46DaHmBKSujcAa9pxF25OBl4K6srEXeIVsiD2rSMqy7ArHeXsBeKEKAca/uCrhigxAvnrKMvvAWzMtVWwu9ENdYinVdJgVX6Ekp4gJlI5cRxRqX4EBuxmZVfCjNVQtUMwDv3l4v8AuFVE6pPacA7y19NRBV45Vo/nWcJxVqfZ4hoiHALLxKwVa12hX3DtM2cwcqz1xNkPD/4F1EloPX9ADQ7Okxqd93GW06KjBZe/+F0sBdmKuwzZT2lsyHQaeubhgSihsz2hHjcSAYviE9XE3oxKCLWuYbnGswF2R1uouce8FM1h1M1Rd6zLyHYMyipro6SAgP6MZwY9GzrHymVS7TXGw9YZcB0gInSZGg7sX5laNldpnEJVUQBeQjRAv3Wb1UNgPDBgUD1jhgc8R8PVtximMJtXrLHSfyKcOsxJV0Kj7tXePaDxPoAUm0Hl/YcqxRvibPEVj/UAn1F/ExEriirhLK6QYqDrmGs6jKrrBVL9pYczHDKDMFeGU1WCDPaXai1uEjBCseIaTXEqIdmoCXpuod09IKLWnAlPvLgt5Dr4ge9HGpk3mjK17ssLJVKOIafQtxWa/wAdoHhnuRVFCnHUh2FdiOUT1uG06ubfxFozWOTGr20Nfu2O0WGU2GIlE3eAu/eGLLE5GVkHgUEGpihg0R01KtzA6JruUvOO8S3ESBk1KbjFYcQjTBbGJUU5jqfSOL5m3qTNVkyFqnlgKrDvKRajQZi8wdIpf7jQitduSD1ei4/3AK1UrW4lb/ZBJB4YAeg9/wCH0wB+73oagVIvbZTn4i5aVTZLtHkU+hNlRumCm2WrXOJWvMywEpHUdzxCS7Ioy3KpxgmAq4v6EzvEwQVE7jMzPJNnWYXEW1nMAtGU5j11DjJEG0DpG4vCApS8dMQ0Kzit30LYLAS8hq/MFDCtRo6VCoOz9pM6RL8QhdG/4PwmJvS/ui6t2VCpRKF4z4jHmXyKrAqQukwe0aHhvP8AcqZbioHSBlziYal3CwxKSkizcbt1GsnEA6Hc3qXwTeHSZ2YmrEnP7y8F+kaF8wae05zxL42+ImY2PX7RrLe1V4eJktls6epKURJJaNTlRkBv1WHzdwfnpHTcv7ageh/B+Azb5/dVQtCNqobysneCxvw8vb8IstDu63CWK8lDKLL3GVOErwYmKqYkHF0QXbVwy9o290d5JlqLmllAw0KblidOkKrEjjrcwFliovDXWdOVf7jBB6xqxXdGUsQcXjT4uWJ5CzJ9YipsOFuBQpoD6oACsvH7fx/4PwGbfP7qFNYO4mN8g88wGQtJvB6s2pjpv4NsAHFXCoGDrDcVFEMGpbhLVqb1GmpZeGV+Eb4alndmbjULFumPFHiLWlXDjGQzDAU8wWzqARzxcyF3qExGab7S2QHpuFTaeiDSVUUdTuQKwFDko7H1jUaVC3WeZSOVGKKt0+87/Lz+38f+D8Bm3z+7UV4EShKRvniUYcBdL37y3NZxeHmiBohdCVHQG4OkGjBMgpqB3gzFy6z0ib7R6yzxBzY8Q5G5uhKpQbHrCUUX4lKlkoY6DGSXLZUAhzeKiTLfoMFEPjEKQpOr58XEBFM8jsdoHCuKYdWAwDI2briWsrlC/b9v4/8AB+Azb5/dxbjtL1d8UXAtk0LNHMRSyOi/livd9n9LFz0mSjpBaxMNTSncGsOoqMQadomAhqLgi29+YElesx2vpG3cLWu3iWO7EtUhAENl5xhhpVxGnI1BUweJlZT7xKXb1KPzuLSwNOQxrz6U4PnmF4BkcsWA73jn9v4/8H4DNvn910JgcaL3iphZqKpQOlEEGwaTrKqLqekWxrpABUC6grK1BX1ljcaWr41K3jU3qAQjHuzRuIRzukIAPeNCcUxfHzApsYhLtqWYI2VMK4tAtRWYlXecwVstMrRmy5VnVS7BTh5JetFYtzEpdnIfmoytayMcEC7b6+n7fx/4PwGbfP8AnXpV73EWn4J+dJjeblkGz9AoDcCa1rJAYYLwxFtfp9Yry4gBWri5fXIuY8IX5MEFBV7TSU2Yu6Kl7XrTcNrJnUqerxBXExLMKDAbXWIPYYjgvKPzR1Tt6SwtkunOPibcZBtUrYtOKlPKVouF+NG3a54gYK8C6u8y5D3mvVvUuZZiphhZbEezuRdguimKRQOLuAzV75Zn08qIuFc/BGlR2Gh1P2Pj/wAH4DNvn/OzlKEzb4c/p06X9Ir5X6DcEbTNftKmC+ucsslqDlYS+Ci3dSqtwPTcF0rt4aerDBEYwvqzWvMK4Yc7olwNekgHLVL9ISk0YDVnlMQIQCsHT7f1EWJixB/qOCs9pZQbHcexHsrriGw7zjvFMRrYXEZokXJYFr6EBEzoi/8ATHjIDJaPq8xrXaccFQKogdTXvBUT4IYLLv0iFG1xFQrqPUgNRiAu3vzMLBSL8SpNjtNeANlQut9p7x2nLyNwoxK+umz2/Y+P/B+Azb5/zUjrMDVU/T9P6orQodwtDe249dSiecs2VgJZZWwrkXcXXlotha04qAYJnZHOUM2vCNmqYpv16xzQRwhnz1nVhY49pbrd+GPsC6WMlTXiDQVRpzEVyfVAUGAlDvcMiouHUBqVYbmSYtwRxgdRUMwAq3VobgJpdxS96sYDKw7agbFw9vaYUpfCYICvMuhQYam51m/rHLL3K6MCrpOzCbEsq4oWje7rBGG4015l/GLHpO5X7H/P4/8AB+Azb5/zFsJ1WdfoYbhKTGbZdo67wuPwxB4FSVJH3qEsdDlFGPIekJVVcIdiG+ktBz3bmMq7iuYYqA8rjsQUo0ELrf3gVFC+QOtTE2Pce8EooyOffmY4pXzA6TwwCu3mIcoQHDFwSA8cB38Qrk3oLsQE1I6C0tHiYzXQ0XBUy3uq4Ylzdprl4ji3WKkmRaFxs2OT1lDC4DvEVmmLhk7M48c/YhgsyyMwApaa9ouhe8rIkIVblfJGKaYfd/z+P/B+Azb5/YoscKfq9AtpB0D4K/tA4DqxOx8O6rg86mOTaOR39Zd2RZOkfIafeUMpcLHwh4p9IjpOnNOkogpbd31jfisu15xEoXaoenHiEAwANNHMzEmRV+jBXcBzC0YjbuKDbiaWqsAp8Nj6iGAXWt+sruVQza/3DPECsCPtL2bpjZ7xg2MoXEqfLyLolc58pTS0aK+ZblSKO84SjrBmJ2zDRYJh6QAGQ5Hkh04VCBTqX9MIaPEcpq1Zd+0f8/j/AMH4DNvn9hOwVM0mn9OrUGTU3PDRmQOkMHFFOtNypGoq91V16wSFNX6kCLXMqGxO5CpZrmN2XcDimTSTloc5lJRpQJSJct9Jb0J1NxLWqMB2gQB6ShgutR1sLuCuuHULNfJzMxdcjqIrC4WBWh9zPvLCj1RYRzWveOX4XQ2dkMFr0p6S7OwSpmrF0LDVVguNkp3gq9I6llFLtw6kitUuFzczBS+ucfsfH/g/AZt8/sO0qlWGRmhX9N2+RIjOMkC2R7gEKrZUU0wIOZQqcTo9I0q9RIrnpKWao7S+Qcu0EOTpAKAHXCNqF6QEgPmI1wPWDQGruUE89YBbdb/QSmw4h0Dp4IxZHSWWAenSK5ODLMFeToYng3zGqhd1Uw8K6b3Ctt2RLSVFOGUwkzEUEWE64mB2gV7R7GBVSUjKkuqnIR1g7ZaVy3gMH7Hx/wCD8Bm3z+xg02GIN61J+hs8xgzuTW05PQjqx49oDgIiUyw3dlK8wErvBYgLKvNx0gRgD1YhgYi7oqFljvtAi4fMRHiHWKFMXXvKlTvERb0Khtl3phYDPniZMBNzQqjzNkhOZgAKhohLx0fCGr31gOOw9Yb3cBiszuKLOJoNxzDywLOVIopzAAl/aZSdJdywevb9f2Pj/wAH4DNvn9nPzSh+qirsWEVbXXkUl0auAsPTmZdOwBL54lvv8QzAFzslCsc8TbVrD2IkBoYgQNxnMYY8Fx721ejmOO14zKwtnLDoq0uHH0ljGoEyUe8Ruo3yRHR0jW3B2WTvshixb2SmcJ5mA63AMEtruw2uDBRl4YakB4hihSdibwGXr+x8f+D8Bm3z+zSloalL1r9OpjDKeSX4ckV+Cbiq4h8wuXx+JsR1rRDlT7xcEZgygl4gCtFTalOYZ8olHDGbmyixl0hxioCwZq8koB6oq6x3KCfOYRBTM3gxKhXrMuCHsbitvnjvFWLmc7EiNptwuZFw2nHMdv2Qoqi8S9htvxEV90uBpSurFCUuHj9j4/8AB+Mzb5/Zp/gw+tv9KCtCYSFHnZ8k1q98ys1xKwNZzQhdvMUAXmYMFsWzUrS6gdnqYWDczbCAb1zAy8nEd5vENEEIGbV6h9y5WrgWxKWvvN74i5bjEySizgeZezVYzRu3JEtZgceJonMq6hxLCbFwQuJrUAAN3MAyLAE4I/DN+/7Hxf4PwGCh3/Zxt0zLs7B+hUMTPKHRMykar06PJ7wFeWa7gQ1Z64jVrY+sNI75eOcRDDaim+hmZjiUMqzLi0aIblxHUFuM33Bv2lmH1wPmYBFwG1i4rLB0JnCyiqbI1FPuxZfNxiyr8SjNbdMWejouWA1G6dRcaUhE2UzUKAaMejvA04qbHzrx+jgjDQ/sUL1P4Ozx+1cllRrzi7Pb9cEZT6Q8zJ2zh+aibvZKOaMs1r7y9oAcxqr2MUlog/Kp7ygCqagW3tqKIwV6y3qOx2SgQXPSYFyBdTD+URlhls28dItcL5hbKg16wjPscS9N4MQmjMSripVsDMSL4iJ8pmG2j6x0HYtwC54ggduCW0ljv3JqGn6xgChx1/W7zJDs+P8ALmec/wAE6fErTiv2nMaFuWIfob5ayR6W27h7/uD5PYYRliwsqP1cS7LcrmZVl3KNHEGFeq+s6uu5m053HCZVYhOFQ3WorBV7KmNue7csC4IggLzOhlrDCxX1dZgNW+GDEDOQNrDBF2MXB6s8yvBbW6mRprBTBbXz0lw1yDHJTW5rEs9+D0SasiFhffP+F06L6T4n+Rsu8NH+ES/pr9pxGkBfrBBb5P0IJZVOlA/rDELznO46RIMRw1Hg8RIHjiDjc62dekZZXe7OESwcJq5lQTXEtZfRcENErlg22PESq2jh5hYALVR9kv1hqvmMAVnWNRs2D1RjAB+VLGyhV9WIXFmA1Q6x1mCxcKUpw5pmgXCOfWCnBhLn0mUXDNw0Gazln/dn/bn/AHp/3p/3o5ULQQITuv8ALvECYp1/CB+0o2X0zLK2TX6VLNXBQaNwVRYkdj1mJX2iPVK2v9ygDd+bjPpVKz2mNEtFNkzoWNkGGjdd4tdj0ZTuhXPEMA/7iJbUM3mBo2eCGusFu5Typvcx7HpzLbbRtIQNrxbFqr9b1GbZGle8AbXUdNeS7iJDdarnEKPBj6oTkqhjsthdUH64+0p3lO8p3lO8p3gBvP8AnSe36w0A/hUlxd/tORIa9ziiMIXPqGC+bRf6YnolltYqy+IDU6YAwyfZFAPisQ9nnG+pUtXCi0rtLoxTnUaBV6qZmI2mYmVNrLhkKTuI4f5JSGZBrXuM1bKDRE6nyqk3rfC6gw1XVY4nYBvMCisQRvd39IbWYFb6RC5zQesQJrUd4qX81h9P1QbanaTtII4T/O5jRcNfwlMLRKr9rJmi8NPnP6LV3JyrNX9Fa3Woy+p3myXuAB+EK9YXM4021A4N4YzF8bRgypaCvSCYDHbiUjVi6iZj4QVyQDACldpUpEMNFfepQFQqXjpLJHO2hmbh7qcw5zfaZDiiquJMpkW6lS61MSrO2XXkxMi2vmIpyt1LF01mIyWq39FoWdiMVPzCfmEJsUDEtS9/5BQ6J/DQPklhFUj9vMo/QfomMMGZwD5/R01JH0MSkpNXp5JYCNzMkFpCBpDTJcCId0EVLjp1h2Bb4iYuY31iFfdmGoOO01tjyweNKZL11iFDnfmWVVyUwCpesxPRh1hUtXUEC3HiNAmBzK4sCkr6feMg4q0iyO81KMPI8H6pSVcjgh/4qXr+lR1QMTOa6/50uy7P4YtHUjNFZv3/AGjZ4bli5tf+AWx6XRuagLmuP98E4ybjXFxsUv3lC4KuJtys5jhsP9QFYyTsJ3hTD2gVR3NgjTmGSuusQjkWpeNGoDTEcHY6IYAo1BtbKUZihiwqt7lpoHypOD1tepAXbVy1Dj3nMSxz4hshuXMdHpH9WaKEHePXaX/lQHa1A5Ot/wASijev2nTHv8VHf6m3wXHTdio/Q2MjSrnifPWOAa0yiWG5sot4JwO5hQjeAzDsckIaN9oIkA5agvN33hkBmJtYcrYMmRz0gsDKmfpKgG8P9wAXyrmOnWLlz9FHZQBEcnNtyi/RMA6hudms4jA3Zzcq9XAfqJc1g8xClv8AzseWAsItB/EDPgUiU0/tKTlqoBu2czvJ3kXC05fER5vN+md9wPcJaXuB0Y6AydZReXi+OYZVdcSxQKEqIdlVvMYO3iYMtGKlcUE95kwLoO6lgnTvvKVXnd8RZWaxMqDlLiAHVGPpEBjbfVL7dMuiuY/d1YWdi4KQ3zCyTgAJsp/VYWzqMNCOhXEa+E4P2KHWD3fxR0QVBMrJPH7Tz09kXA4lT8dz8dxAxuqClH6u2J9Utno/WU1RUqDvEQkesA1AhQm6l44lZbzz1l5pxzUpY135miM3T1lSCh4ZZNHDxDAeIRQ0EdZFfEFQf9xx6cmCU0XLrrdTZ8vEdYNxEjlBvvK4U7f5nwcn4lyM/CSUV7Xk3+wCoG2GHBzfxtIVFX8K92rN2cf1LSvWWNmIkBi5eMReRn7x+lDd82auNsBnRGIoxUvz1moplwYjTYqls3rmUP8AFh3YpHTNdZhzuBQvcXC1csRZnEVge79pQAzjXWcW0vmV+hFsUpa3+wtDYHoh6EKP4x1VofKGFSU/wW3oEl9TF7iAWsJipUN4l5BJnrYS6wqdOsQ4Z23L0qWbVKysJpjRA1qomlh6BHRkNVHEUocsusuWfablnWoocZlIs3qA5udwVXdlFfyZ9IKDFuM4qULsFcLtOIV6Rqq6nj9id82B/HQSmOgbr7/wt1gnamz6xLxhyw8Gl1jxpkJR2s4IUFBUfDgI10yrqFAtOst0Je1cwhQjdwgALW3xKu3xUUKqCggnvEqsRV3RVy5IlOjUAsCjtKo6C5WRwo96/QeacY5hRFVuysHZiAu7AtUnp95VjNcZv/I2sqCXVBfn+QKwmRApP4BX6vgYqpXa9n7QNMasHZfMoWvm6TOC8RigLx3IW5l4qUmRrvLqCwWkvCA44YOja4IDiniLbVUW2dwxxAC427oiDiBgK8FSxms6qM67cQYRWB6Mchk09Z2bh2UF2WvNwyWDWaVaDBFcxQFKlPVisP8AiqB/JAIJY7iPzrx++FoS/HVwVf7dX7QrGuMs6JhlwpkxmKHYyHWJiVgOSWkA7pJaUhvM0PnvHja66O4UQXbNyfEsB6w/GeQlyrqKY1KnWHtKCIA+SoA1qqhHq3MLUdMGYo7RE0rTlz5ImorzyjB/cVUNUZq7FjAozxY3b/gNFqlPID5/lI8wyPMPGkyfvPkelQZxdcWQipdJXg/3GvPdPmXG6call4UwxRm/6mUBOkSUeo6Ihwx2gXO8txPKXCNYlE7p0pbUe803mEMUDjEDYuIgiurWCFLcYZ3fMAd5S+zBdcAhVOx1XjDxEGbotaXWtQW+YoL0dIMNitW5NtR0RFaSWTdwbB/Sr1PWgeP5e9zYoyqfvNKgpolY1dGi6XBdayTetXTMtbG4g0TCRdD1gNtt3LsVDqSsaE9Ypla7RC0vWA95muXGKt9JrY5ih8zIP+y53N2pxEFcsgQ6zAOYFBwLzxAsPS9EjUrqZ46rFjYEyN0efNx9GdcX9porfI0+b11mRnAm3iOPaOzks4b7FTgK7foFg3WsMmgVj+YPRRHGN3L9zJmYC30DPvxBQABxfK/rFutZlBYYLUdHiy5kLmRZpx1iKSEqDxCEGHQGcBzcKwLGe7Pc5g2asOZkWntDUozBp0QFVnmMlbAY7ylRl4IxXrIdEv4CaOVmdEWlpb5WDRaHJZYE20GlpOG8hXpLypk5oyenaHquebz3e8oysHvXsesorg2piujHXxFu7LebF0GplXiCwqqKjsCi/L+cSAoyqHlSfsAuiDa1KGxfNRUwAvm4FTZat0PLzzGhCVyrcc+kBClm75zAZxvIyqzJpEoNjRnE+DpBsEHzLBZ7SkaFeIRavbFTHmhvQJklerDjdFNu4mkPE2CqjLBR6alDDbRwmsGC3ZCPYqfmuWDqGdum+vb1mXmttdX21F3M0WlJXBFb8qiVkQmcBNJZSU3bFYuHReGnbAtQwDpWHZ8dZlQlDlLeDPxHi627D2LOsVl2eS58Ziu2xfeCri6DsYyMHCst88QPlsJY/wA60xiwcwKBSbP8EDG+rCmVjtAVqrq+ZUlWs0YuJQEmTYyo6IaA94tiXkt3feJdWY7AHj1JThKcbXr+bicl64KsyFdo4DYN1dNQLi0WVZaN7r0jlNrapSCnr1iUYLuQCAPUv2jSEvOYYQsu3XpHRfnV/WIYADz9oDAUyj8EEKDwDjvLFEVu/iN2xpcsdFwA54OrMIdYrR34qMwMAtg+H9TIKYKlgen/AGZlBYGq7v8A2eFBORj9JVyhc2qm3Af6iqpVhSHVOAigpYOWsA2EEFpcuOxXma4M3fDPGI015YzWXmLE1trcuAuRs5gvjv2Izlyi9qu2oO4Fpzi+JeO0Dk9N/wAxa8/vUp2XTcm5yDaaTiLBZaUypgmheojaWlG0fX1gaZxzq/FbgKKhgbz5ksIBWWGR6xQVWXe9ky3UIuuD18QBSCsVsJQWDmt/bjye0LVDGAPG31hQtBUpZmuX7RgUt44Mw80AoBeDn+5f7isdLamJFckkgInGYBhRnI9kN1V5UoPWVgd4S3X50l4Bb3eHaUQPTdSHd4g1DaoVx2i6q1YBPfMMBSO27UvMrlCULPL1cuukLMANqovS+hk9oSDtg26fS4o8PseB1ZUUGwcj1i5VgcY+4EZVGRuzD2JoqiFE/FxF4VkHAVvz/UEoFANMm9sXFgNXWB3tgu0qhRcazBaBwgBRq0RhJbT0ZYWAzcFc+k5N4Uv/ALBW4dJTf33Li0y3dD/ko150NIQ5KDA2sHnaMj28wAIB0mn+L3n0RNv/AKPu4mMc4uVPTEyLt8vQQlDsCw8r0wNvrDnuJVPGvr8krChKu7jwYUplmsQRQDKDgmUFDdmV/Wotgj3ei/eYBSp4yy10ZRZXF+7HDJhcdel1qJwGWbWvVekDSdO6zfV8StHQmB0+3H5UEJ0Il13/ADvD1liwowRQ6AjLTH07RKgA4s0mQH0fEwxMW9GvG4JhKxqyVBFcBSQeBtKNLLhk4OSHwWjBVziG4GzHOdl5MRgoDIvW81jpG7ElEehk9paZBoQJteOMc3CICoh0ozgdPTiEwPRS6xt6vpLgGKaequh6QFqNrbJ4IGG7tArMQoIW9ZhWr688Q3FsLzXfpUE4BKaPfIQhZopTj1i5QTwWNssEZAxxl9IggFLb1f8AUpyWDQpX+pRzbZxhu3uSlyCtkbrSqGwxNwzFob4xG0FLsKsRdb4jcFqB4OXHX6SgdOANvs8a56xNsNRdaXUvG3MEQaqwKZXPXxLBHN0s10+GKWS0u0faHFz1lk7P9wAKEdI3f8HoBgNr0iQz4E2vXRHIu23U7yxm8dGvROlMvQ9yDYJQYs+TrG7NGhX4kFZIra2+z0mijeBqPZuUZCgyGR6naX2dNsdj3zEUgabtl9oJ96rBlpUV0me87fWC0roXg9H7xI2L2pt9cSgxrUDIPT3ZeTou+T/UFW0DHX4JzBDdYC+PWCRtOggQVLezSZsDisS2Caq6Slr0S0aumAJzbzJgw17HrEyB2YcDFaRLJA4jlNEaFmrLt/zpBKWtCurjTDmJFOqyvewm/UlGVkGuDvKBUJva2MEtlKy3ZXTH+43QAWHp1g0zC1nrNW9MwbKLIKPr7XAIWJ9Hgj4VOgbfPTvDBlHW357TgYdbh0wdzU3BULZDrcSqFlKNL/qccDoNxMgwCuztFAt6Jhs8LxhjgFvTKpVo+8SZWsgoVqu+JsoWy34DfiCzjbDQr0dEzsVC1aql42f1C9Q4IFNUvrLUsbWLzepcbW4Yo78OtR2KYBVDXROdcRRho2QNnGO7KENDyh/DcQYI2tPH/Idd1HZ68QAQR0jv90q6WpgmWCY5njpEbGdpPXHIGdbjuQMos4Bz3bx2iilYbTR3/uBVte+T79ZTRbV3COj9/aGjCp0nqQYSOnIPR/NS0gBFp10odc4IhqwL6D2vvuNtAsCeuh92CKCkN/8ABlwGjNOTufmpQBjxcdn2iacS6eO49JlNKbt0c5bd9CFzK5DLt4RF6eWfaF5Vkwuf6oy6AtWt2+fUjMkCWXRV5H4zKAowvIcqrz9ouRPTGomyDrDRdA66qDCazmetZEhEAQ4XuS1VNU4IgJheFdfH1hAW2yYx0RVEHNXdz3lOSABxR58QxERZRnrnERVuMiktj3TUtpOl0dkBTddAqwxm+/MLRV9K31t8+YgC7dsfLxKBWIVi4VXjiAt2qvtH/YChgx4Mf9SwIhBY51Z45hUJWi8eOD/UwIsvgweZeWUoZlOU7QRCymi7pwHsQZYAsaqOPVW4KFgS2CTpA7JKapAKps7F9WDUJa0hdAyi+GLYuHZwMAnpFpoCLWsV5pgxXtM0INNFOt9swAQOwVBtF9ZRpAtu3wFGncaAQJvhJ8pKJIaFGFzl9MS4M1SLQ5Sq53BAwCyVR07/AOoo9UEKFe+NGO8WxPTWX9fOYqLMmWnYh47+bt+vEMsGRLH9qkFZnf8AAlpr3MfX95aIAS7NyEuBdvZGe70jSimrTAF4quvWFlUTyYytYSowptlGxEd8RtaTdTeS0w5zwYxMDoFz5eM6otiKA30/xvlmhVxdwbNdc8HSAK5s0Mr6ZrniAFYKYUwH/MYlBVqOLyfhApbLC6TD14i2AANDee1mTRc1cF5O8ekCkZlYw7x0lK2utOvH4IKZ0VZmtcuWO6lQWHLz2iGwcFaZUZ9I3F3cq1q8SjAOWvvLkg0dtvX34iXUid+uPWUITQ24GavucQwCgg2mOHdRAGTiiElQL1qUJDgyx4zDpCStFj1O3MrhrAF1nq9WXUutRpbxg6VBZKXW7WOty9qMDOJpvvAJ1AfhEVCaoCw7sDRcSnPl8Rqs5GWePxzGIbFeK40f8jAoWWTwefEFiMiXyUuXx9IpTHWo50wRhUXYtdk8/adZec73+GIqo5KtuT+oBtAOTS6Hob1LLTWi1M3l8QAUYFup0XEbEHM/Bd6YFjNGp91aPWW1dDcboGhDxPMN1QJwV8QMg6QS4b1vnPx6wZXVhEr169ZtMAd2tF2NagVAaN6AW4MuU1EoVDZQlo5bXTAJsTFmwN1x1iktSXdVj0E1/wBjegogWta8lQSyNhAI9UzEaJLHFl108+8USIZC8H2lyDUNtO5HtOZyl9yGGflfX/O8AnIrz79pxu0N+GFJOizIvEYESwb8hjIvWWy1xUZuhhXGCJIy9W66cOrEAAE4KItbxluiGLAecrG11hdRavEeQdoF4ywHh+Oh9VyigXmXaMCvlcRp2DzcXQOcG46g8aWrXCuC24g0y/fJWazjMcAbBa8HpXfvKCywtlvTJFVd2ShNOMMBSKrtuX8OkCGTSpfMz36RaBSKF5Xm+7zBrDIC6WcsZXiJAXhzX1f6grEa6RXSKdFNrmALoC7KpfjEQippMWLtz6RNqCGxjH0rH0gpNIbLd26S2ivBt46W3O/vAWFekqawCesRF9wKzvmZKCzVzmA5Iws0X9Zk2VV003jMCYbaBbIDqUVgo6a9IaIlFfSl0Os3vg5+ktyAyK6zt+kw1BBGXWDpX0ICwAPNrBx/2O0lBgezl4z9oFhlLeV/rEVaBWGuuxKhlLQcbd+zjvAisRPK/fMEVOglkObPWswybaIBE8JoxcMxVASzyNQLtatGK726fjMAo3iraM9MkFON0YS3YvhlGgtFgIZUW61KIWF3kANCQJdNLKhXVDskTkumJVF3fLzEBQAYIwI5F4/NTBSeS12BnfERGjZjG0db1h+JgIPATaDKjrrEtJcr3g0J6RRGoMGtdIb0kzMstcLdi+GIIVdtDug5HPeChUFQGyaEcf7iVoDF8q9D5jKBAKXL0jpF6NV3IRbDRz/t/g4y6l5yWF67f2iAQy2GvdE4yac7vR/Nwq9nU/gfzcXImzbt4te0sMDiBU4s8ZmRi2qqmmKUczbVumyjnWBWJojk3LajjLeIXYWG28hlexAZLo50FoF6tmikaxk6Qxl7yhlwUWuI3y2yoFmUopaChzgioxQWACcOHzKKQW3vdW84JbcFBSsnF8GIlgZei5quXrHKhX2GcPS+856vbp6w47REAWaFePuisusBQvTody9wgLeQ55FfWMlCQEUHH3gLGr7RKG0AxZn7wLTRJkCWNtblEQPKXNqutkXCOpYDlp4/3EABtYX3M8dfWFQb2hu/EtkjLbtE4ixqaOAzrtAeQJfJu7hc0M44VvtECQq0grUQrWxyW6xZ+EEoG4Fa1W6/KjXStUhAO/rHdqo4Kx1iaNVoppyb7RZBY1kVxGK8qOfR39YUUe1Yb1txh8worqyb6VEEvCvSHlx3fESw9BUNI3zBRGBstXA+k0ApyaBu7lBSuF9Ya35gN1kWHq16cygimlVdrtQnVLc6iMVXpMikrae11QeRlErZXgvbjdblUeDK1oXbeyaOEDEpLily8QdnLAaVy5dlllcdOpBai61NgKbA0sAr4IHtCDbqA+fvEWwqFcBUs+v1gqQpOhHMpFmOR3wK1xAMEmUolglOeIqjS1bHdeO8oXdFMkBxTvrMIU4IiT5QqIJWlKIIA2i+IoElCit06MqlrOh6v6sjAtVwEo62BZ8e0ZbCThLTK2RMuAeH2/qArQG2D8Fg2F0srR2iLByAL16u0sJVYwx6LmFdKaEvK5ocR1SgABSg1RRtWZF7UjVlTpANCDf1zeM8RBthmQpDlWMFVMQpPSGTdGfmDMBG0XRfTLqW0OaE8rWMGJmhUmqNt8sWpwBSNVVfXMxi3smctW4mUtla6HWW8FTCpsxm2ci845i70uLHBrC8UStlDVWHwvrMMgJuqu1PrLKNiZTHqvmUYa6LtbjVSugbwXwZ6TAIlWbsuErzBJC3UDYtG+0YMB47K663xiMTeHAUrjD6QJ2mBkTreqGUeBkC+yj0yx2sUx8DN5N7l0wt1CIvHSIxBLS1bdN4gJNHBgJ+P1iVCglOkIc2bjsktsxQOFgGmsFCVY0OPJKNhqDGhLdNnmFEbV04wN3fr3iB6juHe/GPiHeSVZxvj0jAtVSNY30mekjJ1Z9sfMsuAt8HbrnmMzRRN+Bo5pgC5m0mmneLxuFogAU7rxh/GIVqmBeA2/ozIKXqmi5vF6lyRZOKeJl9INaFyRa7vnTMKKgmDBd97I2cC1qyGs7TUo2lOOUXn2MAOU2TFORfEEsoumQOgfYmUhMqrU8g9n7yqCX0poN5M+espTZeEZorPv33BQhYCeDDhhYcNbWBdfnMplIUMs7vOoDLGVtFM56cymhbHF21UK9MwspBR2oJtt8RGLNUDO4ZSwZn0FO7XzAx6TSBCVaRZJwgYGCqltli2UeNHn9BwCtHARpVXWm6cvbtLtEvTQe35xKGBIu2oy0+Dc5F8icRb6W77QDDYK6xzn3mhDSjvov84jznJ0V/dbNMdDLr0NzDlHWV9XEKWsbIFOai3NRVCvCjiLu3m4tGi3gJlOWl9CIBQ2FOU38EGSW2TXeKNUSzIuAtvNbaLzglkIAvAOAc40zNYwlfQLLcu4ApKNbrnMy1EC7NAoMtrmFxtHFlGtvbMbVoCBeOq8Vcuq7W8m+F5wbllVAl0sE5VxiDBaN4y53j1hwS6LyaOWCMoC171C5i1paBukrPHtKawyDlRot4ly5IEqh2d3MQpSXJhyGL3r5los32rbGL1KyATVmbzroFSwG11cTjlwRVYXtbdCzzzKUCwQZc9vmUZMBZJXZ/uN0aXSR4PlKUM/txsWdl+kQs2DGhd/mU1tNoqhB6dJv8hsAs1LPkMAjdvWAqUy4WdaJYjFGRjX3jcWAss3BqSatCPQ6QwK74uBlt9ZZAE6jwCxUZAKmXU8/E0W9huxOvENvy5F+DDCsG0GzIco98zRY0mTScHeqlxwuXQPK3CulLRaod89Y7iBV124FllMRTuPWuILgoo7BXh8yxtGCmQOl/3C+SQ4WKw4fvMBXJZgE/5GiMXy16vxKwGk5uQLwh6RSIvxVuqDzKBsjitm0qF9omNgvLZwXQh4hZiStpXZ1RXRgCgNPkRla6birZNZACXwPtFVKSZNyXYrEbUqhxUCLwy31C1JVujPDDcWDCKLVdtfpRYa0xcePrHYgMktFZe0SLMGMbed95VChWthnh4NQOkQprG8t/HEt3lmw+CWMogVkybeWGMLczWyqzbKSwG2sdT4Sy4NrrD1dXEsFS1jBjm1uH3QgPYysRqUpQlvebowytWe17XAd53KNIREwi8F5wRS0IbwdAAN7jSrbMIp1rBmAoQlVuzOcZZculWr17uOJpMkwAvDWeLYoGxoLGWiuJRSlqqMnnC2ArTi3ZirzURGVJaSdzLiI3ttg4OkIiBFlcnrCkFDChdd6liFX12VXPfMwoQii2C/EHlQCq48j8xBCFUHQ6NvMtvEtjFtryneJEC4FpJ5DzHiLBriIYu+/iMSGBrLaqOnf3mELYFTGVWVLwBgjbFW05PwlDpe1XTVd4kyk5skeC9wuREMdBdagZiBWqKytXAtIkKhA5r+4BdQLZsV9mV1oDLQtuuHEyLUFJQ6qcdrlAGbNVPB237xZUTAtLtxXSINrwWe6NZiWhdkUrqgwblCAqgacIxacdZbVC6rA10E1xHW20pRgzbbqBXYuwFp4y8ZiJYAsGVuIgLXES/IleJTZGa4kHvKqosA20ut+esWTR3K6OsO9xFWUYGBKuKTaGFtOX4gVQq1dQi+NflRWLYqiiyHbn7QKAErmHhfCyjQvSXYFrfpKmayg5eQFrWotrwcGhu7b6MoXRWqogFVTvMVElDxwaylcFcwJWawbAOpFY4mOotqjHWFEYGhKCqxYDQCmhsAqxG7WRMqKtFdcSgbjC2F6rloKuhmzkxC0ihQFb2zJILCg0unj+4lFym+Tx6wIqaHBkvjHu9oogla22HGF27l0OQ8hpz9alyXykAroc8zmWAYtCZ9i8sLvDKG1DOPWPJniZ9NZ5gDQaEaDFQ4LWByqaVQggWW9Fquq2iW4IYLBYAK6m4wbOqbo2rWMyir6620FoL6sfBmW8sqtwsDsyLHA7ywgBbRsM0xW8EWzyCVSXqHRSNAW8mKRoBGiFVX1iBBW+EpQy9ooMa2ZHZjEdbUA1LOmpCjShuAVm26zC2zRohwjmvMsRkOW2W3gv0thUbnLlVEoOYRXUVdWl95a2SsCY4NStcoLZqzY/m4mrO9kBKMMtirhVsKrs/wCoTHAX0GqLb/3Mu06TZarIsKOiW7YvsiEXDgarrMZagOi/AXAF6BWulvxCBCW3KBd4iKS72MC8IwqabFewBv8AMxQ4MJ3LfG4h3zLbfDMRqu6b6VKKdYDkLa9Y7cggdOChNQxQyGkZ8pxxOQzbsoF0Rso0RvXnqh8/eIIDFMAbHt1+sVbO5KgObPH3glUKTqFXRZ+czK2sWnZa1cbyYAHQVtPr6xUpGofKVtp8QyC7ezoR2ZbRbKp1bNRbTmA2t2ezAYqwgdCwsu9dluAIdPSWqSnlGhMYLzNJLcWg5cVbuY2USqJ0qK/uKAONKGpynlKx7zIVb2rgXBUYhjgAFC8t47x20vOB1YpW/SFXWFcwjwPtG9B0yCXkJQBsUDA4Q8wWm32KM9My2RqpdzpK8xQUvlVTRXpUBZsVi1Q0Hp76lKhtWzAIa78TNIBtHjxlPp1iYLWnqS17bm6lJSxVlqG9gi6Q1nx8QUfC6MNNqZ694AEhe94vy6OY2oUwnXQKrcQppZ5jxhvpFEUgOgTC17QQwsDyKUya4lGyqOoNqvMSQWfIPNFiKyNGMZsW3mFgZUKSxd4VgxEwB5Mc3q12ia2GdAqMUVlxK2ytRyKypjBDC1Q03S3Wt5lDAUtOK3nnMxkZtpQct+yC1iBQzd3jE2qlbQtaswLUFdUU2zK4pabXysyzLdLQ2KRbx6H5UB7olpE82rWNR6QLuBxVc3dwF8QILCVlewxrzVbVoCm/P9SneR5xWDIF+fbiWBA7FOV59zcpBOZgCs1p67hwtau3Iao6nv0l4YKGybVyfmIBFAWXpKtx+Zg+ZRSKNDcQLCrzK9MmoEpUQKXv0ghUvqENC3qfhLIzZKgHoMwN3ZT1bNGZhXWVoLHNj/UEUNgvjRrXOdwGIcGhZStG4oGKaQAarF69fMo2pWxFGj89IDayEBdm6s8/aNUgQHYoVbTn8qBvQqnQjs44+0oqSrAoS6+30iNCqG4d5Oz9phUELoqKXv8AEAgEVs4AV34iCuQ/FMxVWVcLKb4ZRrsppHcp89YFW0eBuCBto61KcHuTVgUK5K8hErMhSmA3i+8qKmxbI1Q8EKtTgzyP+0imBXhpkt3XSItVRCgDx5gAGcSoKrDvXrHkIy00N/yUDKuqDN8Wwd0guSHFfMwNK66SUtyhVbMA2No+koqXqNA0g8TbjMro30W8QzVGRYrwmxVAp1nyXcSEN9UzrLjgzGg0+fXmj74haJCUHPmaVrVepMqo6/eOgShD6huYlpApY6FcufiIAp/1PfEyHAokcAKfWAUO+MrXi2iZFinMoKNl8tRa1HJZ2ZVGwTUJWgXmgvMQlRm+JNdcYg1LWzSLem0JYB6DlWoBbxiOaLRv2JzmAHKtbAMtF95dgoRhG23VvpLXq72O7LtAWEHeDl5QcERcqvW6GAlgAtqbENGeqQLYgoi2m1W4SWasUpzXBLqGPeAp6txWqd0uzvneZs8NEDnyEQ3GDMWOIvBRVVW1q3TLmLRcJYBSuO8QMIAlAcZIB5R7DbNHMd0pVIGFfJcKKMxc10MnY+I3KBbE2vVs6SgoGQLtB46xuktpCnYuLEqWRQKrMqhj1rrasL6ekpBoiUtwbdOIhptXYS9oC16wGgqbNm9W+jEBQWN8VVuTGT7RN0td9aGjHcnGeNkS1ch/2bDY0ugrzh/OYlY3gGojxj8uVWyJa5dhZk195qoGi8bN5B/OYoSk0tQ64fPXvEbVDwGCuddZ1EGTZ7CzWpVUwAdtryGGV3DFNK8PnrFCKYA5OD8vMBwgmeodYZZkLLAwL58esJXFXCtPOSKiOYow3V9YaJCK9KsL2IJbJCrNPRO6QzcFrGk2tvR6Qo0LYx0DWXywdKB3B4yagVg1LYouTpqNQNUy4A2V6niZWAyQCugCoUXRaoMk2oem4uKo53CtD01AF0iisq8hMEvpWBtK9YIdGviGtxeFBQjlVVXOesbcKRZFFmpoChzindx4+ZoaGQLrVU95ZFVtNQvI/SBAA3Cxs/EV1zgW2yVeI1BeqcNvD6HvBusEwoWG/EoUsCtLB1frKqsGXDmavOC4AlOmaG27lBxbALVmksuVFh9UZA6QGwDqBlm1nCLwZQxY0ZltM6FdBxQ5gBbyy4eoHQlxrebMoWBV4z1gUx0ENtBar41CwKVuODdWs4Jd5OOhx0UVLMgnNrlVCvrAAsOKHoKy4JYVQvSMZ/puIAIsNosVql6QcqKrSYir3l3KAtqA0UBozrMxwIABWy/Mwim4n17p3n6TCYBDZwnq6xzgDsKfIx4hAyyguX1cflTOMPkX+ck1A6Zp3fzpMYA+mRK4vqxFLMXgdzrGGUClF6h1XzNlWS2tB9sxYPVgs26rLRmCtAbVN6lBocyRzyFqRddIBSm3l53KCRQFiwVGgJRpCvQKZNfepmYVQTaeae0qWAAXDevMvHoKOwPfj2iAJUQ9DY58TKo3EsO8nmULArMFDffmCg7BdeAqsO5Zi4d0NCf8luDQA685N/eW3NZoKAe3X1lFiS63XjDv7y0OlhoX66gQHdH3fiIVLVytFOKlGNCpyjNFV5lVY6RKBUt4zL2ojSGA1jvXMaAOWkE5Lb0cGJiV56AZo5t3EUuNaYE3ExFQvQ3kw6PMRxadIcY89IiWG5FftdwsjKpYKbUem4wrKi30hYDnGo2EcW2V2rfeW7oZugOl/wBzJICu221RKNiqv5ho8M0RIxQp/wAXSWCyrVTnNRb4iBWVrworLfaXY7LAVVmsHn3hUimLRybb4/qVNJNDZQK2S8gbNjWyiDOWEbFGq+kQiNSFEq858e8bm7rMAGRupRVUhu2AThuAbLQoWQuzGC4MGtBWhTaOMuftMQMc+AW6oJSK2DTS275hEXJ1QyLNLBCRhowWKV4xNiU0Lk25AcQTBZBravLCHLLA4Z4FZZDtFLEqvAF4o6vWFcNZQN7tAKKJZXK+Q2+Ba9Za/wAcFZ9VYV6jCYo18FzJTEUvArRRlzKaSi3a4pVr5WIhQVQRNprO5QClHRu8KxibXdQCvoF6dougUIgMG3mJE5NC9xTnUo6pkQNg+1Rc9AAHnqBFB4KkXU7EAY9UwIWCOWnXaVqYIFU1aF48yqWrzFt6F8RCVoBXXuz54l6rDlaousp3gQgIxm2cpFpbwQglh/uCAWmUgh0D7H1hZQFIWN9/EBYYgtKlX35ghVUtV0DGHHE0AI0wmwcR3ukmYk6igs4wa36wVsjBP6BjWolABQMC28h+VLJLyiQA39ZbMip8Dhx5jQorYNUqwqXLHJKqZXq/Ey30udWF46f8ioW2odU5rcCGLtblt7mmNpZKvusLQPmLmQBUvBgK9JasKSZFWu29HpAoDDQA4KzbuIVDAgJdy4ioWFAeEH+pc2kRgLcbxEC2IJd21rtABGsCxUe0aGQLeZaLoq8ZhlBaKw8t230Y8J21GwBq/eMxIQnSrDBREQz6OX4zAGDKqThdGIiKwddk6QfJ9YmFmijR1KiUpHAq9YKrfE//2Q==";

const coverages = [
  { name: "Home", desc: "Protect what matters most, from roof to foundation." },
  { name: "Flood", desc: "Specialized South Florida flood coverage and NFIP options." },
  { name: "Auto", desc: "Competitive rates across top-rated carriers." },
  { name: "Condo", desc: "HO-6 policies tailored to Miami high-rises." },
  { name: "Renters", desc: "Affordable protection for your belongings." },
  { name: "Business", desc: "General liability, property, commercial auto and more." },
  { name: "Boat & RV", desc: "On-the-water and on-the-road coverage." },
];

const reviews = [
  {
    name: "Jiovanny Gonzalez",
    quote:
      "Pablo and his team are both professional and caring. I was able to secure flood insurance through their office at a very competitive rate. I look forward to doing business with them for years.",
  },
  {
    name: "Kenneth Ross Jr.",
    quote:
      "We Insure is the go-to place for a fair evaluation across many providers. Pablo and his team helped us re-evaluate our auto insurance and got us better coverage on our cars.",
  },
  {
    name: "Stephen Roberson",
    quote:
      "We received 11 no's on our application for renters insurance. We Insure was recommended and they wrote our policy right away. No hassles. Done in 15 minutes. Highly recommended.",
  },
  {
    name: "Kathy D.",
    quote:
      "Awesome experience. Got me a great condo policy within hours of contacting the office. Calls and emails are returned almost immediately.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Team />
      <Coverages />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="container-page flex items-center justify-between py-6">
        <a href="#top" className="flex items-center gap-3 text-primary-foreground">
          <img src={weInsureLogo} alt="We Insure" className="h-8 w-auto" />
          <span className="font-display text-2xl leading-none">Pablo Taquechel</span>
        </a>
        <nav className="hidden gap-8 text-sm text-primary-foreground/85 md:flex">
          <a href="#about" className="hover:text-primary-foreground">About</a>
          <a href="#coverage" className="hover:text-primary-foreground">Coverage</a>
          <a href="#team" className="hover:text-primary-foreground">Team</a>
          <a href="#reviews" className="hover:text-primary-foreground">Reviews</a>
          <a href="#contact" className="hover:text-primary-foreground">Contact</a>
        </nav>
        <QuoteDialog
          trigger={
            <button
              type="button"
              className="hidden rounded-full border border-primary-foreground/30 px-4 py-2 text-sm text-primary-foreground transition hover:bg-primary-foreground hover:text-primary md:inline-block"
            >
              Get a quote
            </button>
          }
        />
      </div>
    </header>
  );
}

type TeamMember = {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
};

function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    void fetch("/api/public/team", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { members: TeamMember[] }) => setMembers(data.members))
      .catch(() => undefined);
  }, []);

  if (members.length === 0) return null;
  return (
    <section id="team" className="border-y border-border bg-card">
      <div className="container-page py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Meet the team</p>
          <h2 className="mt-4 text-4xl leading-tight text-primary md:text-5xl">
            Real people, ready to help.
          </h2>
          <p className="mt-5 text-muted-foreground">
            A local Miami team who will explain your options clearly and stay with you after the
            policy is written.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => {
            const isPablo = member.name.trim().toLowerCase() === "pablo taquechel";
            const photoUrl = isPablo ? PABLO_IMAGE : member.photoUrl;
            return (
              <article key={member.id}>
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={`${member.name}, We Insure Miami team member`}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-secondary font-display text-5xl text-primary">
                    {member.name.charAt(0)}
                  </div>
                )}
                <h3 className="mt-5 text-2xl text-primary">{member.name}</h3>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-1 inline-block break-all text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {member.email}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt="Mid-century Miami home at golden hour framed by palm trees"
        width={1600}
        height={1100}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/80 via-primary/55 to-primary/85" />
      <div className="container-page flex min-h-[88vh] flex-col justify-end pb-20 pt-40">
        <p className="text-sm uppercase tracking-[0.25em] text-primary-foreground/75">
          We Insure Florida · Since 2010
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] text-primary-foreground md:text-7xl">
          Florida insurance,
          <br />
          <em className="font-display italic text-accent">tailored to your life.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
          For 15+ years, Pablo Taquechel has helped Miami families and businesses choose coverage
          from the country's top-rated carriers — with the calm, personal service of a neighbor.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <QuoteDialog
            trigger={
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
              >
                Get a free quote
              </button>
            }
          />
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { k: "15+", v: "Years serving Miami" },
    { k: "63+", v: "Five-star Google reviews" },
    { k: "12", v: "Lines of coverage" },
    { k: "Top", v: "Rated carriers, one office" },
  ];
  return (
    <section className="border-y border-border bg-secondary">
      <div className="container-page grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.v}>
            <div className="font-display text-4xl text-primary">{i.k}</div>
            <div className="mt-1 text-sm text-muted-foreground">{i.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="container-page py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-accent/15" />
            <img
              src={PABLO_IMAGE}
              alt="Portrait of Pablo Taquechel, Miami insurance agent"
              width={600}
              height={600}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-xl object-cover shadow-[0_30px_60px_-30px_oklch(0.20_0.045_245_/_0.45)]"
            />
            <figcaption className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Pablo Taquechel · Miami, FL
            </figcaption>
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">About</p>
          <h2 className="mt-4 text-4xl leading-tight text-primary md:text-5xl">
            A Miami native who treats clients like family.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Pablo was born in Jacksonville, Florida, and raised in Miami. After earning his BA at
              the University of Florida and an MA from Barry University, he has spent over two
              decades guiding Floridians through one of the most complex insurance markets in the
              country.
            </p>
            <p>
              As a licensed property and casualty agent operating under{" "}
              <span className="text-foreground">We Insure</span>, Pablo and his team give you real
              choice — quotes from dozens of top-rated carriers — paired with the kind of patient,
              plain-English advice that only comes from a local agent who's been doing this since
              2000.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Florida native, raised in Miami",
              "Insurance agent since 2000",
              "Licensed P&C agent",
              "Married, father of two",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-base text-foreground">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Coverages() {
  return (
    <section id="coverage" className="bg-secondary">
      <div className="container-page py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Coverage</p>
            <h2 className="mt-4 max-w-xl text-4xl leading-tight text-primary md:text-5xl">
              Every kind of coverage, under one roof.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Compare options across top-rated carriers. Buy online, over the phone, by email, or in
            person at our Miami office.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {coverages.map((c) => (
            <article key={c.name} className="group relative bg-background p-8 transition hover:bg-card">
              <div className="font-display text-2xl text-primary">{c.name}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <span className="mt-6 inline-block text-xs uppercase tracking-widest text-accent opacity-0 transition group-hover:opacity-100">
                Request quote →
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="container-page py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Reviews</p>
        <h2 className="mt-4 text-4xl leading-tight text-primary md:text-5xl">
          63+ five-star reviews on Google.
        </h2>
        <p className="mt-5 text-muted-foreground">
          Clients across South Florida share what it's like working with Pablo and the We Insure
          Miami team.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-8"
          >
            <blockquote className="font-display text-2xl leading-snug text-foreground">
              <span className="text-accent">“</span>
              {r.quote}
              <span className="text-accent">”</span>
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-between text-sm">
              <span className="font-medium text-primary">{r.name}</span>
              <span className="flex gap-0.5 text-accent" aria-label="5 stars">
                {"★★★★★"}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://share.google/ZstTllhBg0EJpPJcl"
          target="_blank"
          rel="noreferrer"
          className="text-sm uppercase tracking-widest text-primary underline-offset-4 hover:underline"
        >
          Read all reviews on Google →
        </a>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-primary text-primary-foreground">
      <div className="container-page grid gap-16 py-24 md:grid-cols-2 md:py-32">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Get in touch</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
            Let's build the right
            <br />
            <em className="italic text-accent">coverage together.</em>
          </h2>
          <p className="mt-6 max-w-md text-primary-foreground/75">
            Reach out for a no-pressure quote or a quick policy review. Most clients hear back the
            same day.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <QuoteDialog
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
                >
                  Request a quote
                </button>
              }
            />
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm transition hover:bg-primary-foreground/10"
            >
              Email Pablo
            </a>
          </div>
        </div>

        <dl className="grid gap-10 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">Office</dt>
            <dd className="mt-3 font-display text-2xl">
              10749 SW 104 Street
              <br />
              Miami, FL 33176
            </dd>
            <a
              href="https://maps.google.com/?q=10749+SW+104+Street+Miami+FL+33176"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-accent underline-offset-4 hover:underline"
            >
              Get directions →
            </a>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">Hours</dt>
            <dd className="mt-3 font-display text-2xl">
              Mon – Fri
              <br />
              9:00 AM – 5:00 PM
            </dd>
            <p className="mt-2 text-sm text-primary-foreground/65">Weekends by appointment</p>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">Phone</dt>
            <dd className="mt-3 font-display text-2xl">
              <a href={PHONE_HREF} className="hover:text-accent">{PHONE}</a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">Email</dt>
            <dd className="mt-3 break-words font-display text-xl">
              <a href={`mailto:${EMAIL}`} className="hover:text-accent">{EMAIL}</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground/70">
      <div className="container-page flex flex-col gap-4 border-t border-primary-foreground/15 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Pablo Taquechel · We Insure Miami</p>
        <p>
          An independent agency of{" "}
          <a
            href="https://weinsuregroup.com"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            We Insure
          </a>
          .
        </p>
        <a
          href="/admin"
          aria-label="Open insurance site admin"
          className="inline-flex w-fit items-center justify-center rounded-full border border-primary-foreground/30 px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary-foreground transition hover:bg-primary-foreground hover:text-primary"
        >
          Admin
        </a>
      </div>
    </footer>
  );
}
